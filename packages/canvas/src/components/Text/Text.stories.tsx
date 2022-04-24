import React, { ComponentProps } from "react";
import { ComponentMeta, StoryObj } from "@storybook/react";
import randomColor from "randomcolor";

import { withRenderFrameProvider, withCenterDot } from "../../../.storybook/decorators";
import { bezierEasing } from "../../utilities/bezier";

import { Text } from "./Text.component";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";
import { useText } from "./Text.hooks";


const fillStyle = randomColor({format: 'rgba', hue: 'green', luminosity: 'bright'});
const strokeStyle = randomColor({format: 'rgba', hue: 'green', luminosity: 'dark'});

export default {
  decorators: [withCenterDot,withRenderFrameProvider],
  component: Text,
  parameters: {
    canvasProvider: {
      width: 500,
      height: 500,
    },
  }
} as ComponentMeta<typeof Text>;

type TextStory = StoryObj<ComponentProps<typeof Text>>;

export const Default: TextStory = {
  args: {
    text: 'Hello world',
    pos: {
      x: 250,
      y: 250,
    },
    fillStyle: 'black',
    font: 'bold 48px serif',
    textAlign: 'center',
    textBaseline: 'middle',
  },
};

export const Stroke: TextStory = {
  args: {
    ...Default.args,
    fillStyle: '',
    strokeStyle,
  },
};

export const Fill: TextStory = {
  args: {
    ...Default.args,
    fillStyle,
  },
};

export const Shadow: TextStory = {
  args: {
    ...Default.args,
    shadowColor: strokeStyle,
    shadowBlur: 10,
    shadowOffsetX: 10,
    shadowOffsetY: 20,
  }
};

export const MaxWidth: TextStory = {
  args: {
    ...Default.args,
    maxWidth: 240,
    font: 'bold 480px serif'
  }
};

function RenderAnimated() {
  const [fontSize] = useAnimationFrame({
    from: 0,
    to: 480,
    duration: 1_000,
    mode: 'pingpong',
    auto: true,
    infinite: true,
    easing: bezierEasing('ease-in-out'),
  });
  const [maxWidth] = useAnimationFrame({
    from: 0,
    to: fontSize,
    duration: 1_000,
    mode: 'pingpong',
    auto: true,
    infinite: true,
    easing: bezierEasing('ease-out')
  });

  useText({
    pos: {
      x: 250,
      y: 250,
    },
    maxWidth,
    text: 'Hello world',
    rotation: 0,
    font: `bold ${fontSize}px serif`,
    fillStyle,
    textAlign: 'center',
    textBaseline: 'middle',
  });

  return null;
}

export const Animated = {
  render: () => <RenderAnimated />
};