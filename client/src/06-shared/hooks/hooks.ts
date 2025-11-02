import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/01-app/store/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
