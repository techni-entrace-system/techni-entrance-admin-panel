import { Link } from "react-router";
import { Button } from "./ui/button";
import { Image, PictureInPicture } from "lucide-react";
import LogPhoto from "./log-photo";

function formatDate(iso?: string | null) {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

function formatDuration(ms: number) {
  if (!isFinite(ms) || ms < 0) return "—";
  const totalSec = Math.floor(ms / 1000);
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
  if (minutes > 0) return `${minutes}m ${seconds}s`;
  return `${seconds}s`;
}

export default function LogComponent({ log, withName = true }: { log: any; withName?: boolean }) {
  const name = (log.name ? `${log.name}` : "") + (log.surname ? ` ${log.surname}` : "");
  const entryIso = log.entry_time ?? log.entryTime ?? null;
  const exitIso = log.exit_time ?? log.exitTime ?? null;
  const entryDate = entryIso ? new Date(entryIso) : null;
  const exitDate = exitIso ? new Date(exitIso) : null;
  const duration = entryDate && exitDate ? formatDuration(entryDate.getTime() - exitDate.getTime()) : null;

  return (
    <div className="p-3 border flex flex-col gap-2 rounded-md bg-card">
      <div className="flex items-center justify-between px-1">
        <Link to={`/students/${log.student_id}`} className="font-semibold text-sm">
          {withName && (name.trim() || "")}
        </Link>
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div>Czas trwania: {duration ?? "—"}</div>
            <div>{log.timestamp ? formatDate(log.timestamp) : ""}</div>
          </div>
          <LogPhoto logId={log.log_id} photoType="exit">
            <Button size="icon-sm" variant="outline">
              <Image />
            </Button>
          </LogPhoto>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="p-2 bg-background rounded">
          <div className="text-xs text-muted-foreground">Wyjście</div>
          <div className="font-mono text-sm">{formatDate(exitIso)}</div>
        </div>
        <div className="p-2 bg-background rounded">
          <div className="text-xs text-muted-foreground">Powrót</div>
          <div className="font-mono text-sm">{formatDate(entryIso)}</div>
        </div>
      </div>
    </div>
  );
}
