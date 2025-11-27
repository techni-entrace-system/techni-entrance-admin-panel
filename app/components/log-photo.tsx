import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogTrigger } from "./ui/dialog";
import { useLogPhoto } from "~/api/logs";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Spinner } from "./ui/spinner";

export default function LogPhoto({
  children,
  logId,
  photoType,
}: {
  children: React.ReactNode;
  logId: any;
  photoType: "entry" | "exit";
}) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<"entry" | "exit">("exit");
  const { data, isLoading } = useLogPhoto(logId, type, open);

  console.log(data);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] max-w-[90vw] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Zdjęcia</DialogTitle>
        </DialogHeader>
        <Tabs value={type} onValueChange={(v) => setType(v as "entry" | "exit")} className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="exit">Wyjście</TabsTrigger>
            <TabsTrigger value="entry">Powrót</TabsTrigger>
          </TabsList>
        </Tabs>
        {isLoading && (
          <div className="w-full max-h-screen aspect-video flex items-center justify-center">
            <Spinner className="size-12" />
          </div>
        )}
        {data && <img src={data.url} alt="Log Photo" className="w-full max-h-screen aspect-video" />}
      </DialogContent>
    </Dialog>
  );
}
