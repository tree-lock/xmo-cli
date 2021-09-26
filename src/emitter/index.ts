import mitt from "mitt";

export const testMitt = mitt<{
  increase: undefined;
  decrease: undefined;
}>();
