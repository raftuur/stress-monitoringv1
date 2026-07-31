"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";

import { useCreateRespondent } from "@/hooks/useRespondents";

interface Props {
    mode: "create" | "edit";
}

export function RespondentDialog({
    mode,
}: Props) {

    const [open, setOpen] = useState(false);

    const [fullName, setFullName] = useState("");
    const [gender, setGender] = useState("MALE");
    const [age, setAge] = useState("");
    const [occupation, setOccupation] = useState("");

    const createRespondent = useCreateRespondent();

    async function handleSubmit() {
        await createRespondent.mutateAsync({
            full_name: fullName,
            gender,
            age: Number(age),
            occupation,
        });

        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >

            <DialogTrigger
                render={
                    <Button>
                        Add Respondent
                    </Button>
                }
            />

            <DialogContent>

                <DialogHeader>
                    <DialogTitle>
                        Add Respondent
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">

                    <Input
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />

                    <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full border rounded-md p-2"
                    >
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                    </select>

                    <Input
                        type="number"
                        placeholder="Age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />

                    <Input
                        placeholder="Occupation"
                        value={occupation}
                        onChange={(e) => setOccupation(e.target.value)}
                    />

                </div>

                <DialogFooter>

                    <Button onClick={handleSubmit}>
                        Save
                    </Button>

                </DialogFooter>

            </DialogContent>

        </Dialog>
    );
}