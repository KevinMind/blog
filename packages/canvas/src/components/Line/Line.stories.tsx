import React, { ComponentProps } from "react";
import { ComponentMeta, StoryObj } from "@storybook/react";
import randomColor from 'randomcolor';

import {
  withRenderFrameProvider,
  withTodoList,
} from "../../../.storybook/decorators";
import { Line } from "./Line.component";
import { useAnimationFrame } from "../../hooks/useAnimationFrame";

export default {
  decorators: [withRenderFrameProvider, withTodoList],
  component: Line,
} as ComponentMeta<typeof Line>;

type LineStory = StoryObj<ComponentProps<typeof Line>>;

export const Default: LineStory = {
  args: {
    start: { x: 50, y: 50 },
    end: { x: 200, y: 200 },
  },
  parameters: {
    canvasProvider: {
      height: 250,
      width: 250,
    },
  },
};

export const StrokeStyle: LineStory = {
  ...Default,
  args: {
    ...Default.args,
    strokeStyle: randomColor({
      format: 'rgba',
      alpha: 0.5,
    }),
    lineWidth: 10,
  }
};

export const LineCap: LineStory = {
  ...Default,
  args: {
    ...StrokeStyle.args,
    lineCap: 'round'
  },
};

export const DashedLine: LineStory = {
  ...Default,
  args: {
    ...StrokeStyle.args,
    lineDash: [10, 5],
  },
};

export const Quadratic: LineStory = {
  parameters: {
    canvasProvider: {
      width: 500,
      height: 500,
    }
  },
  args: {
    start: {
      x: 0,
      y: 0, 
    },
    cp1: {
      x: 430,
      y: 30,
    },
    end: {
      x: 500,
      y: 500,
    },
  },
};

export const BezierCurve: LineStory = {
  parameters: {
    canvasProvider: {
      width: 500,
      height: 500,
    }
  },
  args: {
    start: {
      x: 0,
      y: 0, 
    },
    cp1: {
      x: 430,
      y: 30,
    },
    cp2: {
      x: 150,
      y: 400,
    },
    end: {
      x: 500,
      y: 500,
    },
  },
};

function RenderManyLines({ width, height }: { width: number; height: number }) {
  const [x] = useAnimationFrame({
    auto: true,
    from: 0,
    to: 50_000,
    duration: 20_000,
  });

  const middle = { x: width / 2, y: height / 2 };

  return (
    <>
      {Array.apply(null, Array(Math.round(x / 100))).map((_, idx) => (
        <Line
          start={{ x: x / (idx + 1) + (Math.random() * x) / 300, y: 0 }}
          end={middle}
          rotation={0}
          key={idx}
        />
      ))}
      <Line
        start={{ x: 0, y: height / 2 }}
        end={{ x: width, y: height / 2 }}
        rotation={0}
      />
      <Line start={{ x, y: height }} end={middle} rotation={0} />
    </>
  );
}

export const ManyLines: LineStory = {
  args: {
    start: { x: 0, y: 0 },
    end: { x: 250, y: 250 },
  },
  parameters: {
    canvasProvider: {
      height: 500,
      width: 1000,
    },
  },
  render: (_args, ctx) => {
    const width = ctx.parameters.canvasProvider.width;
    const height = ctx.parameters.canvasProvider.height;

    return <RenderManyLines width={width} height={height} />;
  },
  play: async () => {
    await new Promise((r) => setTimeout(r, 10_000));
  },
};
