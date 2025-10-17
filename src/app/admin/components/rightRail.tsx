// app/components/RightRail.tsx
import { orders } from "@/lib/mockData";

const schedule = [
  { time: "10:00", title: "Dribbble Shot", tag: "Facebook Brand" },
  { time: "13:20", title: "Design", tag: "Task Management" },
  { time: "16:00", title: "Meet Up", tag: "Team" },
];

export default function RightRail() {
  return (
    <div className="space-y-6">
      <h3 className="text-base font-semibold">Calendar</h3>

      <div className="space-y-4">
        <DayBlock dateLabel="Today">
          {schedule.map((e, i) => (
            <ScheduleRow key={i} {...e} />
          ))}
        </DayBlock>

        <DayBlock dateLabel="Orders (live)">
          {orders.slice(0, 3).map((o) => (
            <ScheduleRow
              key={o.id}
              time=""
              title={`Order #${o.id}`}
              tag={`${o.customer} – ${o.status}`}
            />
          ))}
        </DayBlock>
      </div>
    </div>
  );
}

function DayBlock({
  dateLabel,
  children,
}: {
  dateLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 text-xs font-medium text-gray-500">{dateLabel}</div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function ScheduleRow({ time, title, tag }: { time?: string; title: string; tag?: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-gray-100 p-3">
      <div className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">{title}</div>
          {time ? <div className="text-xs text-gray-500">{time}</div> : null}
        </div>
        {tag ? <div className="text-xs text-gray-500">{tag}</div> : null}
      </div>
    </div>
  );
}
