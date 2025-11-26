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
import type { PriceTriggerMetadata } from "../nodes/triggers/PriceTrigger";
import type { TimerNodeMetadata } from "../nodes/triggers/Timer";

type NodeMetadata = any;

const SUPPORTED_TRIGGERS = [{
    id: "timer",
    title: "Timer",
    description: "Run this flow every x second"
},{
    id: "price",
    title: "Price Trigger",
    description: "Runs whenever goes below or abouve "

}]

const SUPPORTED_ASSETS = ["BTC", "ETH", "SOL"]
export const TriggerSheet = ({
    onSelect
}: {onSelect: (kind: NodeKind, metadata: NodeMetadata) => void}) => {
    const [metadata, setMetadata] = useState<PriceTriggerMetadata | TimerNodeMetadata>({
        time: 3600
    });
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
                        <SelectValue placeholder="Select a Trigger" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        <SelectLabel>Triggers</SelectLabel>
                        {SUPPORTED_TRIGGERS.map(({id, title, description}) => <>
                        <div className="border-b border-2">
                            <SelectItem key={id} value={id}>{title}</SelectItem>
                            {/* <SelectLabel>{description}</SelectLabel> */}
                        </div>
                         </>)}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {selectedTrigger === "timer" && <>
                <div>
                    Number of seconds after which to run the timer
                </div>
                    <Select value={metadata.time} onValueChange={(value) => setMetadata(metadata => ({
                        ...metadata,
                        time: Number(value)
                    }))} ></Select>
                    <Label>Time</Label>
                    <Input
                        type="number"
                        value={metadata.time}
                        onChange={(e) => {
                            setMetadata({
                                ...metadata,
                                time: Number(e.target.value)
                            })
                        }}
                    />
                </>}
                {selectedTrigger === "price" && <>
                    Price: 
                    <Input type="text" onChange={(e) => setMetadata({
                        ...metadata,
                        price: Number(e.target.value)
                    })}/>
                    <Select value={metadata.asset} onValueChange={(value) => setMetadata(metadata => ({
                        ...metadata,
                        asset: value
                    }))} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a Asset" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            <SelectLabel>Triggers</SelectLabel>
                            {SUPPORTED_ASSETS.map((asset) => 
                            <SelectItem 
                                key={asset} 
                                value={asset}
                            >{asset}</SelectItem>)}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </>
                }
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