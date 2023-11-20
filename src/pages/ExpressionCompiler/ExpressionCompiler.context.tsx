import { useContext, useCallback, createContext } from "react";
import { useMethods } from "react-use";
import { z } from "zod";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "reactflow";
import fnMap from "../../libs/expression-compiler/functions";
import { stratify, tree } from "d3-hierarchy";

const ExpressionCompilerContext = createContext({});
export const useExpressionCompilerContext = () =>
  useContext(ExpressionCompilerContext);

const initialState = {
  outputType: "null",
  selectedNode: null,
  nodes: [
    {
      id: "output",
      position: { x: 0, y: 0 },
      type: "output",
      data: { returnType: "string" },
    },
    {
      id: "sum",
      position: { x: 0, y: 50 },
      type: "fn",
      data: { x: "test", fn: fnMap["sum"] },
    },
    {
      id: "subtract",
      position: { x: 0, y: 50 },
      type: "fn",
      data: { fn: fnMap["subtract"] },
    },
    {
      id: "x3",
      position: { x: 450, y: 150 },
      type: "value",
      data: {
        value: 4,
      },
    },
    {
      id: "x1",
      position: { x: 300, y: 150 },
      type: "value",
      data: {
        value: 1,
      },
    },
    {
      id: "x2",
      position: { x: 0, y: 150 },
      type: "value",
      data: {
        value: 2,
      },
    },
  ],
  edges: [
    {
      source: "x1",
      sourceHandle: null,
      target: "subtract",
      targetHandle: "subtract-arg-1",
      id: "reactflow__edge-x1-subtractsubtract-arg-1",
    },
    {
      source: "subtract",
      sourceHandle: "subtract-output",
      target: "output",
      targetHandle: "output-handle",
      id: "reactflow__edge-subtractsubtract-output-outputoutput-handle",
    },
    {
      source: "sum",
      sourceHandle: "sum-output",
      target: "subtract",
      targetHandle: "subtract-arg-0",
      id: "reactflow__edge-sumsum-output-subtractsubtract-arg-0",
    },
    {
      source: "x3",
      sourceHandle: null,
      target: "sum",
      targetHandle: "sum-arg-0",
      id: "reactflow__edge-x3-sumsum-arg-0",
    },
    {
      source: "x2",
      sourceHandle: null,
      target: "sum",
      targetHandle: "sum-arg-0",
      id: "reactflow__edge-x2-sumsum-arg-0",
    },
  ],
};

function createMethods(state) {
  return {
    reset() {
      return initialState;
    },
    setOutputType(outputType) {
      return { ...state, outputType };
    },
    setSelectedNode(selectedNode: string) {
      return { ...state, selectedNode };
    },
    onNodesChange(nodes: NodeChange[]) {
      return { ...state, nodes: applyNodeChanges(nodes, state.nodes) };
    },
    onEdgesChange(edges: EdgeChange[]) {
      return { ...state, edges: applyEdgeChanges(edges, state.edges) };
    },
    onConnect(connection: Connection) {
      return { ...state, edges: addEdge(connection, state.edges) };
    },
  };
}

const ExpressionCompilerContextProvider = ({ children }) => {
  const [state, methods] = useMethods(createMethods, initialState);

  const g = tree();

  const getLayoutedElements = (nodes, edges, options) => {
    if (nodes.length === 0) return { nodes, edges };

    const { width, height } = document
      .querySelector(`[data-id="${nodes[0].id}"]`)
      .getBoundingClientRect();
    const hierarchy = stratify()
      .id((node) => node.id)
      .parentId(
        (node) => edges.find((edge) => edge.target === node.id)?.source
      );
    const root = hierarchy(nodes);
    const layout = g.nodeSize([width * 2, height * 2])(root);

    return {
      nodes: layout
        .descendants()
        .map((node) => ({ ...node.data, position: { x: node.x, y: node.y } })),
      edges,
    };
  };

  // const onLayout = useCallback(
  //   (direction) => {
  //     const { nodes: layoutedNodes, edges: layoutedEdges } =
  //       getLayoutedElements(nodes, edges, {
  //         direction,
  //       });

  //     setNodes([...layoutedNodes]);
  //     setEdges([...layoutedEdges]);

  //     window.requestAnimationFrame(() => {
  //       fitView();
  //     });
  //   },
  //   [nodes, edges]
  // );

  return (
    <ExpressionCompilerContext.Provider value={{ state, methods }}>
      {children}
    </ExpressionCompilerContext.Provider>
  );
};

export default ExpressionCompilerContextProvider;
