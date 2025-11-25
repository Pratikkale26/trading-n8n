import type { NodeKind } from "./CreateWorkflow";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { useState } from "react";

type NodeMetadata = any;

const SUPPORTED_TRIGGERS = [{
    id: "timer",
    title: "Timer",
    description: "Run this flow every x second"
},{
    id: "price-trigger",
    title: "Price Trigger",
    description: "Runs whenever goes below or abouve "

}]

export const TriggerSheet = ({
    onSelect
}: {onSelect: (kind: NodeKind, metadata: NodeMetadata) => void}) => {
    const [metadata, setMetadata] = useState({});
    const [selectedTrigger, setSelectedTrigger] = useState(SUPPORTED_TRIGGERS[0].id);
    return <div>
        <Sheet open={true}>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>Edit profile</SheetTitle>
                <SheetDescription>
                    Select the triggers for you workflow
                </SheetDescription>
                <Select value={selectedTrigger} onValueChange={(value) => setSelectedTrigger(value)} >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Triggers</SelectLabel>
                        {SUPPORTED_TRIGGERS.map(({id, title, description}) => <>
                        <div className="border-b border-2">
                            <SelectItem key={id} value={id}>{title}</SelectItem>
                            <SelectLabel>{description}</SelectLabel>
                        </div>
                         </>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                </SheetHeader>
                <SheetFooter>
                <Button onClick={() => {
                    onSelect(
                        selectedTrigger,
                        metadata
                    )
                }} type="submit">Set Trigger</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    </div>
}