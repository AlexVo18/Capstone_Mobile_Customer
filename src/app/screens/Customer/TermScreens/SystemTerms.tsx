import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import { TermDataItem } from "~/src/app/models/term_models";
import Term from "~/src/app/api/term/Term";
import { mainBlue } from "~/src/app/constants/cssConstants";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";

const SystemTerms = () => {
  const [data, setData] = useState<TermDataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      getTermList();
    }, [])
  );

  const getTermList = async () => {
    try {
      const response = await Term.getTermList();
      if (response) {
        setData(response);
      }
    } catch (error: any) {
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const removeHtmlTags = (str: string) => {
    // Replace <p>, <ul>, </ul>, and <strong> tags with newlines
    let formattedContent = str.replace(/<\/?(p|ul|strong)>/g, "\n");

    // Replace <li> tags with a dash and ensure proper line breaks
    formattedContent = formattedContent.replace(/<\/?li>/g, (tag) =>
      tag === "<li>" ? "- " : "\n"
    );

    // Replace <br> tags with a newline
    formattedContent = formattedContent.replace(/<br\s*\/?>/g, "\n");

    // Remove any HTML tags that might remain
    formattedContent = formattedContent.replace(/<[^>]*>/g, "");

    // Remove multiple consecutive newlines and replace with double newline
    formattedContent = formattedContent.replace(/\n\s*\n/g, "\n\n");

    // Trim leading and trailing spaces
    formattedContent = formattedContent.trim();

    // Add a space before hyphen if it follows a newline or is at the start of the string
    formattedContent = formattedContent.replace(/(?<=\n|^)-/g, " -");

    return formattedContent;
  };

  return isLoading ? (
    <View className="w-full h-full bg-white flex justify-center items-center">
      <ActivityIndicator color={mainBlue} size={"large"} />
    </View>
  ) : (
    <ScrollView className="w-full h-full bg-white p-4 ">
      <View className="pb-10">
        {data.map((term, index) => (
          <View key={index}>
            <Text className="text-lg font-semibold">
              {index + 1}. {term.title}
            </Text>
            <Text>{removeHtmlTags(term.content)}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default SystemTerms;

const styles = StyleSheet.create({});
