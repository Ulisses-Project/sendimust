import { useDimensions } from "@/context/DimensionsContext";
import { useState } from "react";

export interface LymphNode {
  id: string;
  compartimento: string;
  ap: string;
  t: string;
  cc: string;
  aspecto: string;
  observaciones: string;
}

const createEmptyNode = (): LymphNode => ({
  id: crypto.randomUUID(),
  compartimento: "",
  ap: "",
  t: "",
  cc: "",
  aspecto: "",
  observaciones: "",
});

const createInitialNodes = () => [createEmptyNode()];

export const useLymphNodes = () => {
  const [nodes, setNodes] = useState<LymphNode[]>(createInitialNodes());
  const { dimensions, setDimensions } = useDimensions();

  const addNode = () => {
    setNodes((prev) => [...prev, createEmptyNode()]);
  };

  const removeNode = (id: string) => {
    setNodes((prev) => {
      if (prev.length <= 1) return prev;
      return prev.filter((node) => node.id !== id);
    });
  };

  const updateNode = (id: string, field: keyof LymphNode, value: string) => {
    setNodes((prev) =>
      prev.map((node) => (node.id === id ? { ...node, [field]: value } : node))
    );
  };

  const resetNodes = () => {
    setNodes(createInitialNodes());
  };

  return {
    nodes,
    dimensions,
    addNode,
    removeNode,
    updateNode,
    resetNodes,
    setDimensions,
  };
};
