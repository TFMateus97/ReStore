import { Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./counterSlice";

export default function ContactPage() {    
    const dispatch = useAppDispatch();
    const {data, title} = useAppSelector(state => state.counter);
    return <Typography variant="h2">Contact page</Typography>;
}
