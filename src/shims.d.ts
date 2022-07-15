declare module "*.svg" {
  const url: string;
  export const ReactComponent: React.FC;
  export default url;
}

declare module "*.jpg" {
  const url: string;
  export default url;
}

declare module "*.jpeg" {
  const url: string;
  export default url;
}

declare module "*.png" {
  const url: string;
  export default url;
}
