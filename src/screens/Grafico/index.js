import React, { useState } from "react";
import { ScrollView } from "react-native";
import Tabs from "@components/Tabs";
import { GraficoDiario } from "./components/GraficoDiario";
import { GraficoMensal } from "./components/GraficoMensal";
import { Layout } from "../index";

export function Grafico() {
  const [selectedTab, setSelectedTab] = useState("Diário");

  const renderContent = () => {
    switch (selectedTab) {
      case "Mensal":
        return <GraficoMensal />;
      default:
        return <GraficoDiario />;
    }
  };

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          padding: 20,
          paddingBottom: 100,
        }}
      >
        <Tabs onTabSelect={setSelectedTab} />
        {renderContent()}
      </ScrollView>
    </Layout>
  );
}
