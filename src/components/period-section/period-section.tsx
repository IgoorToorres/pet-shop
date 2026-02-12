import { AppointmentPeriod } from '@/types/appointment';
import { Cloudy, Moon, Sun } from 'lucide-react';

type PeriodSectionProps = {
  period: AppointmentPeriod;
};

const periodIcons = {
  morning: <Sun className="text-accent-blue" />,
  afternoon: <Cloudy className="text-accent-orange" />,
  evening: <Moon className="text-accent-yellow" />,
};

export const PeriodSection = ({ period }: PeriodSectionProps) => {
  return (
    <section className="mb-8 bg-background-tertiary rounded-xl">
      <div className="flex items-center px-5 py-3 justify-between border-b border-[#2e2c30]">
        <div className="flex items-center gap-2">
          {periodIcons[period?.type]}
          <h2 className="text-label-large-size text-content-primary">
            {period?.title}
          </h2>
        </div>
        <span className="text-label-large-size text-content-secondary">
          {period.timeRange}
        </span>
      </div>
      <div className="flex flex-col items-center">
        {period.appointments.map((apopointment) => (
          <div className="w-full px-20 py-5">
            <div className="flex flex-row justify-between">
              <div className="flex gap-5">
                <span>{apopointment.time}</span>
                <p>{`${apopointment.tutorName} / ${apopointment.petName}`}</p>
              </div>

              <p>{apopointment.description}</p>
              <p>Remover atendimento</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
