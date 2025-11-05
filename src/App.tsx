import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { CustomHeader } from "@/components/common/CustomHeader";
import { CustomFooter } from "@/components/common/CustomFooter";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { LobeTab } from "./components/lobe/LobeTab";

function App() {
  const [activeTab, setActiveTab] = useState("lobulos");

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CustomHeader />
        <div className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
              data-tour="tabs"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="lobulos">
                  Información sobre lóbulos tiroideos
                </TabsTrigger>
                <TabsTrigger value="ganglios">
                  Ganglios linfáticos cervicales reseñables
                </TabsTrigger>
              </TabsList>
              <LobeTab />
              {/* <TabsContent value="ganglios" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Ganglios linfáticos cervicales reseñables
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={"si"}>
                      <div className="flex items-center justify-center space-x-8">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="si" id="ganglios-tab-si" />
                          <Label htmlFor="ganglios-tab-si">Sí</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="ganglios-tab-no" />
                          <Label htmlFor="ganglios-tab-no">No</Label>
                        </div>
                      </div>
                    </RadioGroup>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="p-3 text-left font-medium">
                              Compartimento
                            </th>
                            <th className="p-3 text-center font-medium">
                              AP [mm]
                            </th>
                            <th className="p-3 text-center font-medium">
                              T [mm]
                            </th>
                            <th className="p-3 text-center font-medium">
                              CC [mm]
                            </th>
                            <th className="p-3 text-center font-medium">
                              Aspecto Ecográfico
                            </th>
                            <th className="p-3 text-left font-medium">
                              Observaciones
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {lymphNodesData.map((node, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold">
                                    #{index + 1}
                                  </span>
                                  <Input
                                    value={node.compartimento}
                                    onChange={(e) =>
                                      updateLymphNodeData(
                                        index,
                                        "compartimento",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Compartimento"
                                    className="flex-1"
                                  />
                                </div>
                              </td>
                              <td className="p-3">
                                <Input
                                  type="number"
                                  value={node.ap}
                                  onChange={(e) =>
                                    updateLymphNodeData(
                                      index,
                                      "ap",
                                      e.target.value
                                    )
                                  }
                                  className="w-20 text-center"
                                />
                              </td>
                              <td className="p-3">
                                <Input
                                  type="number"
                                  value={node.t}
                                  onChange={(e) =>
                                    updateLymphNodeData(
                                      index,
                                      "t",
                                      e.target.value
                                    )
                                  }
                                  className="w-20 text-center"
                                />
                              </td>
                              <td className="p-3">
                                <Input
                                  type="number"
                                  value={node.cc}
                                  onChange={(e) =>
                                    updateLymphNodeData(
                                      index,
                                      "cc",
                                      e.target.value
                                    )
                                  }
                                  className="w-20 text-center"
                                />
                              </td>
                              <td className="p-3">
                                <Select
                                  value={node.aspecto}
                                  onValueChange={(value) =>
                                    updateLymphNodeData(index, "aspecto", value)
                                  }
                                >
                                  <SelectTrigger className="w-40">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="normal">
                                      Normal
                                    </SelectItem>
                                    <SelectItem value="patologico">
                                      Patológico
                                    </SelectItem>
                                    <SelectItem value="dudoso">
                                      Dudoso
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </td>
                              <td className="p-3">
                                <Input
                                  value={node.observaciones}
                                  onChange={(e) =>
                                    updateLymphNodeData(
                                      index,
                                      "observaciones",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Observaciones"
                                  className="min-w-48"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-center">
                      <Button variant="default">
                        <RotateCcw className="mr-2 h-4 w-4" />
                        RESETEAR
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Información sobre nódulos tiroideos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={"si"}>
                      <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="si" id="nodulos-ganglios-si" />
                          <Label htmlFor="nodulos-ganglios-si">
                            Sí, hay nódulos que describir
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="nodulos-ganglios-no" />
                          <Label htmlFor="nodulos-ganglios-no">
                            No, no hay nódulos que describir
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Número de nódulos a describir:</Label>
                        <div className="flex gap-2">
                          <Button variant="outline" size="icon">
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent> */}
            </Tabs>
          </div>
        </div>
        <CustomFooter />
      </ThemeProvider>
    </>
  );
}

export default App;
