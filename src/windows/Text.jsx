import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import React from "react";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="p-6 space-y-4 bg-white max-h-[70vh] overflow-y-auto">
        {image && (
          <div className="w-full">
            <img
              src={image}
              alt={name}
              className="w-full h-auto object-cover rounded"
            />
          </div>
        )}

        {subtitle && <h3 className="text-lg font-semibold">{subtitle}</h3>}

        {description && Array.isArray(description) && (
          <div className="space-y-3">
            {description.map((paragraph, index) => (
              <p key={index} className="text-sm leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");
export default TextWindow;
