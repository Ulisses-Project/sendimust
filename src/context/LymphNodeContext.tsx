import type { LymphNode } from "@/types/lymph/lymph.type";
import { createContext, useState, type PropsWithChildren } from "react";

interface LymphNodeContext {
  currentLymphNodeId: number;
  lymphNodes: LymphNode[];
  updateLymphNode: <K extends keyof LymphNode>(
    id: number,
    field: K,
    value: LymphNode[K]
  ) => void;
  setCurrentLymphNodeId: (id: number) => void;
  addLymphNode: () => void;
  removeLymphNode: (id: number) => void;
  resetLymphNodes: () => void;
}

export const LymphNodeContext = createContext({} as LymphNodeContext);

const getDefaultLymphNode = (id: number): LymphNode => {
  return {
    id: id,
    compartment: "",
    ap: "",
    t: "",
    cc: "",
    ultrasoundAppearance: "normal",
    observations: "",
  };
};

export const LymphNodeProvider = ({ children }: PropsWithChildren) => {
  const [currentLymphNodeId, setCurrentLymphNodeId] = useState(1);
  const [lymphNodes, setLymphNodes] = useState<LymphNode[]>([
    getDefaultLymphNode(1),
  ]);

  //* Initialize maxId based on initial lymph nodes
  const [maxId, setMaxId] = useState(lymphNodes.length);

  const updateLymphNode = <K extends keyof LymphNode>(
    id: number,
    field: K,
    value: LymphNode[K]
  ) => {
    setLymphNodes((prev) =>
      prev.map((node) => {
        if (node.id !== id) return node;
        return { ...node, [field]: value };
      })
    );
  };

  const addLymphNode = () => {
    const newId = maxId + 1;
    const newLymphNode = getDefaultLymphNode(newId);
    setMaxId(newId);
    setLymphNodes((prev) => [...prev, newLymphNode]);
    setCurrentLymphNodeId(newId);
  };

  const removeLymphNode = (id: number) => {
    //* Prevent deleting the last lymph node
    if (lymphNodes.length <= 1) {
      return;
    }

    const currentIndex = lymphNodes.findIndex((n) => n.id === id);
    const updatedLymphNodes = lymphNodes.filter((n) => n.id !== id);

    //* If the deleted lymph node is the current one, switch to the nearest lymph node
    const newIndex = currentIndex > 0 ? currentIndex - 1 : 0;
    setCurrentLymphNodeId(updatedLymphNodes[newIndex].id);

    setLymphNodes(updatedLymphNodes);
  };

  const resetLymphNodes = () => {
    setLymphNodes([getDefaultLymphNode(1)]);
    setMaxId(1);
    setCurrentLymphNodeId(1);
  };

  return (
    <LymphNodeContext
      value={{
        currentLymphNodeId,
        lymphNodes,
        updateLymphNode,
        setCurrentLymphNodeId,
        addLymphNode,
        removeLymphNode,
        resetLymphNodes,
      }}
    >
      {children}
    </LymphNodeContext>
  );
};
