"use client";

import { usePathname } from "next/navigation";
import React, { useTransition } from "react";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger
} from "../ui/alert-dialog";
import Image from "next/image";
import { deleteEvent } from "@/lib/actions/event.actions";

const DeleteConfirmation = ({ eventId }: { eventId: string }) => {
   const pathname = usePathname();
   let [isPending, startTransition] = useTransition();

   return (
      <AlertDialog>
         <AlertDialogTrigger>
            <Image src="/assets/icons/delete.svg" alt="edit" height={20} width={20} />
         </AlertDialogTrigger>

         <AlertDialogContent className="bg-white">
            <AlertDialogHeader>
               <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
               <AlertDialogDescription className="p-regular-16 textt-grey-600">
                  This will permanently delete this event
               </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>

               <AlertDialogAction
                  onClick={async () => {
                     await deleteEvent({ eventId, path: pathname });
                  }}>
                  {isPending ? "Deleting..." : "Delete"}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default DeleteConfirmation;
