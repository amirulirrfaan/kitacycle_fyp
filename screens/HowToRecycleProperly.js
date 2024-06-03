import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";

const HowToRecycleProperly = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>How to Recycle Properly</Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Introduction to Recycling</Text>
        <Text style={styles.text}>
          Recycling is essential for preserving our environment and conserving
          resources. By recycling, we can reduce the amount of waste that ends
          up in landfills, save energy, and decrease pollution.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>General Recycling Guidelines</Text>
        <Text style={styles.text}>
          - Rinse and clean recyclables to remove any food residue.
          {"\n"}- Remove labels, lids, and caps from containers.
          {"\n"}- Sort recyclables by material type: plastics, paper, glass, and
          metals.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Material-Specific Recycling</Text>

        <View style={styles.materialSection}>
          <Text style={styles.materialHeader}>Plastics</Text>
          <Text style={styles.text}>
            - Types of plastics: PET, HDPE, PVC, LDPE, PP, PS, etc.
            {"\n"}- Accepted items: bottles, containers, jugs, etc.
            {"\n"}- Tips: Ensure plastics are clean and dry before recycling.
          </Text>
        </View>

        <View style={styles.materialSection}>
          <Text style={styles.materialHeader}>Paper</Text>
          <Text style={styles.text}>
            - Types of paper: newspaper, office paper, cardboard, etc.
            {"\n"}- Accepted items: newspapers, magazines, boxes, etc.
            {"\n"}- Tips: Flatten cardboard boxes to save space.
          </Text>
        </View>

        <View style={styles.materialSection}>
          <Text style={styles.materialHeader}>Glass</Text>
          <Text style={styles.text}>
            - Types of glass: bottles, jars, etc.
            {"\n"}- Accepted items: glass bottles and jars.
            {"\n"}- Tips: Rinse glass items and remove lids before recycling.
          </Text>
        </View>

        <View style={styles.materialSection}>
          <Text style={styles.materialHeader}>Metals</Text>
          <Text style={styles.text}>
            - Types of metals: aluminum, steel, etc.
            {"\n"}- Accepted items: cans, tins, etc.
            {"\n"}- Tips: Crush cans to save space.
          </Text>
        </View>

        <View style={styles.materialSection}>
          <Text style={styles.materialHeader}>Electronics</Text>
          <Text style={styles.text}>
            - Types of electronic waste: phones, computers, batteries, etc.
            {"\n"}- Tips: Find local e-waste recycling programs for proper
            disposal.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Recycling Symbols and Labels</Text>
        <Text style={styles.text}>
          Learn to read recycling symbols and labels to determine if an item is
          recyclable. Symbols like the recycling triangle with a number inside
          indicate the type of plastic.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Local Recycling Policies</Text>
        <Text style={styles.text}>
          Check with your local recycling program for specific rules and
          accepted items. Each area may have different guidelines.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Tips for Reducing Waste</Text>
        <Text style={styles.text}>
          - Use reusable bags, bottles, and containers.
          {"\n"}- Avoid single-use items.
          {"\n"}- Compost organic waste.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Common Recycling Mistakes</Text>
        <Text style={styles.text}>
          - Do not recycle plastic bags, food-soiled items, or hazardous waste.
          {"\n"}- Avoid mixing non-recyclables with recyclables to prevent
          contamination.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#666",
  },
  materialSection: {
    marginBottom: 15,
  },
  materialHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default HowToRecycleProperly;
