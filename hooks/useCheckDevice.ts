import { useMantineTheme } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useMemo } from "react";


export function useCheckDevice(){
  const { width } = useViewportSize()
  const theme = useMantineTheme()
  return{
    isMobile:useMemo(()=>width <= theme.breakpoints.sm,[width])
  }
}