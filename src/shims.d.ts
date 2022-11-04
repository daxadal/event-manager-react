declare module "*.svg" {
  const url: string;
  export const ReactComponent: React.FC<React.SVGAttributes<SVGElement>>;
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
