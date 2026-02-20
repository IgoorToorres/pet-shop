'use client';
import { cn } from '@/lib/utils';
import { Appointment } from '@/types/appointment';
import { AppointmentForm } from '../appointment-form';
import { Button } from '../ui/button';
import { Pen, Trash2 } from 'lucide-react';
import { AlertDialogDestructive } from '../alert-dialog-destructive';
import { deleteAppointment } from '@/app/actions';
import { toast } from 'sonner';
import { useState } from 'react';

type AppointmentCardProsp = {
  appointment: Appointment;
  isFirstInSection?: boolean;
};

export const AppointmentCard = ({
  appointment,
  isFirstInSection,
}: AppointmentCardProsp) => {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete(id: string) {
    setIsDeleting(true);
    const result = await deleteAppointment(id);
    if (result?.error) {
      toast.error(result.error);
      setIsDeleting(false);
      return;
    }
    toast.success('Agendamento exlcuido com sucesso');
    setIsDeleting(false);
  }

  return (
    <div
      className={cn(
        'grid grid-cols-2 md:grid-cols-[15%_35%_30%_20%] items-center py-3',
        !isFirstInSection && 'border-t border-border-divisor'
      )}
    >
      <div className="text-left pr-4 md:pr-0">
        <span className="text-label-small-size text-content-primary font-semibold">
          {appointment.time}
        </span>
      </div>

      <div className="text-right md:text-left md:pr-4">
        <div className="flex items-center justify-end md:justify-start gap-1">
          <span className="text-label-small-size text-content-primary font-semibold">
            {appointment.petName}
          </span>
          <span className="text-paragraph-small-size text-content-secondary">
            /
          </span>
          <span className="text-paragraph-small-size text-content-primary">
            {appointment.tutorName}
          </span>
        </div>
      </div>
      <div className="text-left pr-4 hidden md:block mt-1 md:mt-0 col-span-2 md:col-span-1">
        <span className="text-paragraph-small-size text-content-secondary">
          {appointment.description}
        </span>
      </div>

      <div className="text-right mt-2 md:mt-0 col-span-2 md:col-span-1 flex justify-end items-center gap-2">
        <AppointmentForm appointment={appointment}>
          <Button variant={'edit'} size={'icon'}>
            <Pen size={16} />
          </Button>
        </AppointmentForm>
        <AlertDialogDestructive
          handleDelete={() => handleDelete(appointment.id)}
          isDeleting={isDeleting}
        >
          <Button variant={'remove'} size={'icon'}>
            <Trash2 size={16} />
          </Button>
        </AlertDialogDestructive>
      </div>
    </div>
  );
};
