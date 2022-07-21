import React from "react";

import Selector from "./base/Selector";

export enum Pallettes {
  DEFAULT = "default",
  LIGHT = "light",
  DARK = "dark",
}

interface PalletteSelectorProps {
  value: Pallettes;
  onChange: (value: Pallettes) => void;
}

export default function PalletteSelector(props: PalletteSelectorProps) {
  const { value, onChange } = props;

  return (
    <Selector
      id="themeSelector"
      tagText="Theme: "
      value={value}
      onChange={onChange}
    >
      <option value={Pallettes.DEFAULT}>Default</option>
      <option value={Pallettes.LIGHT}>Light</option>
      <option value={Pallettes.DARK}>Dark</option>
    </Selector>
  );
}
