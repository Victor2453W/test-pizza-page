import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="border-orange-500 text-orange-500 hover:bg-orange-50 hover:text-orange-600"
        >
          Open popover
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 border-orange-500 shadow-md shadow-orange-100">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-orange-600">Dimensions</h4>
            <p className="text-sm text-orange-500/80">Set the dimensions for the layer.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width" className="text-orange-600">
                Width
              </Label>
              <Input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8 border-orange-300 focus-visible:ring-orange-500"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth" className="text-orange-600">
                Max. width
              </Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8 border-orange-300 focus-visible:ring-orange-500"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height" className="text-orange-600">
                Height
              </Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8 border-orange-300 focus-visible:ring-orange-500"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight" className="text-orange-600">
                Max. height
              </Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8 border-orange-300 focus-visible:ring-orange-500"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
