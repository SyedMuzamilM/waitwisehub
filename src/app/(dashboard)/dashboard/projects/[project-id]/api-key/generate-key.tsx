import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function GenerateKey({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create new secret key</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="name" className="text-right flex items-center gap-2">
              Name <span className="text-zinc-700 text-xs">Optional</span>
            </Label>
            <Input id="name" placeholder="My Test Key" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create secret key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
