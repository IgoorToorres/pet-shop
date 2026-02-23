import { Appointment as AppointmentPrisma } from '@/generated/prisma';
import {
  Appointment,
  AppointmentPeriod,
  AppointmentPeriodDay,
} from '@/types/appointment';

export const getPeriod = (hour: number): AppointmentPeriodDay => {
  if (hour >= 9 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  return 'evening';
};

export function groupAppointmentByPeriod(
  appointments: AppointmentPrisma[]
): AppointmentPeriod[] {
  const transformedAppointments: Appointment[] = appointments?.map((apt) => ({
    ...apt,
    time: apt.scheduleAt.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    service: apt.description,
    period: getPeriod(apt.scheduleAt.getHours()),
  }));

  const morningAppoitments = transformedAppointments.filter(
    (apt) => apt.period === 'morning'
  );
  const afternoonAppoitments = transformedAppointments.filter(
    (apt) => apt.period === 'afternoon'
  );
  const eveningAppoitments = transformedAppointments.filter(
    (apt) => apt.period === 'evening'
  );

  return [
    {
      title: 'Manhã',
      type: 'morning',
      timeRange: '09h-12h',
      appointments: morningAppoitments,
    },
    {
      title: 'Tarde',
      type: 'afternoon',
      timeRange: '13h-18h',
      appointments: afternoonAppoitments,
    },
    {
      title: 'noite',
      type: 'evening',
      timeRange: '19h-21h',
      appointments: eveningAppoitments,
    },
  ];
}

export function calculatePeriod(hour: number) {
  //verificando se é na parte da manha
  const isMorning = hour >= 9 && hour < 12;
  //verificando se é na parte da tarde
  const isAfternoon = hour >= 13 && hour < 18;
  //verificando se é na parte da noite
  const isEvening = hour >= 19 && hour < 21;

  return {
    isMorning,
    isAfternoon,
    isEvening,
  };
}
