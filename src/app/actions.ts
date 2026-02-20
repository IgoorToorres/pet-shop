'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import z from 'zod';

const appointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduleAt: z.date(),
});

type AppointmentData = z.infer<typeof appointmentSchema>;

export async function createAppointment(data: AppointmentData) {
  try {
    //validando os dados com schema do zod
    const parsedData = appointmentSchema.parse(data);

    //pegando hora da data
    const hour = data.scheduleAt.getHours();

    //verificando se é na parte da manha
    const isMorning = hour >= 9 && hour < 12;
    //verificando se é na parte da tarde
    const isAfternoon = hour >= 13 && hour < 18;
    //verificando se é na parte da noite
    const isEvening = hour >= 18 && hour < 21;

    //verificando e lançando erro se horario não estiver dentro do permitido.
    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          'Agendamento só podem ser feitos entre 9h e 12h, 13h e 18h ou 19h e 21h',
      };
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        scheduleAt: parsedData.scheduleAt,
      },
    });

    if (existingAppointment) {
      return {
        error: 'Este horário já está reservado',
      };
    }

    await prisma.appointment.create({
      data: {
        ...parsedData,
      },
    });

    //informando o next para dar refrash na pagina "/" com dados recem cadastrados
    revalidatePath('/');
  } catch (error) {
    console.log(error);
  }
}

export async function updateAppointment(id: string, data: AppointmentData) {
  try {
    const parsedData = appointmentSchema.parse(data);
    const hour = data.scheduleAt.getHours();

    const isMorning = hour >= 9 && hour < 12;
    const isAfternoon = hour >= 13 && hour < 18;
    const isEvening = hour >= 18 && hour < 21;

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          'Agendamento só podem ser feitos entre 9h e 12h, 13h e 18h ou 19h e 21h',
      };
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        scheduleAt: parsedData.scheduleAt,
        id: {
          not: id,
        },
      },
    });

    if (existingAppointment) {
      return {
        error: 'Este horário já está reservado',
      };
    }

    await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        ...parsedData,
      },
    });

    revalidatePath('/');
  } catch (error) {
    console.log(error);
  }
}
