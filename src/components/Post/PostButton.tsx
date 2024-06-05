'use client';

import {Button} from "@nextui-org/react";
import { PostButtonIcon } from "../Icons";


export default function PostButton() {
    return (
        <div className="flex flex-wrap gap-4 items-center">
            <Button  variant="bordered" className="text-black ">
                <PostButtonIcon />
                Post
            </Button>  
        </div>
    );
}
