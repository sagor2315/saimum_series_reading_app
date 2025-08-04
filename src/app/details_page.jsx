import * as FileSystem from "expo-file-system";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getCachedData } from "../utils/dataCache";

export default function Book() {
  const { book_json_data } = useLocalSearchParams();
  const [book, setBook] = useState(null);

  // useEffect(() => {
  //   if (book_json_data) {
  //     fetch(book_json_data)
  //       .then((res) => res.json())
  //       .then((data) => setBook(data));
  //   }
  // }, [book_json_data]);

  useEffect(() => {
    if (book_json_data) {
      const filename = book_json_data.split("/").pop();
      const filePath = FileSystem.documentDirectory + "book_cache/" + filename;
      getCachedData(book_json_data, filePath).then((data) => setBook(data));
    }
  }, [book_json_data]);

  if (!book) return <Text>Loading...</Text>;

  return (
    <View style={styles.page_contsiner}>
      <Text style={styles.book_name}>{book.book_name}</Text>
      <FlatList
        removeClippedSubviews={true}
        data={book.chapters}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
        keyExtractor={(item) => item.chapter_no.toString()}
        ItemSeparatorComponent={() => (
          <View style={{ height: verticalScale(10) }} />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.prefetch("/reading_page");
              router.push({
                pathname: "/reading_page",
                params: {
                  chapter_no: item.chapter_no,
                  book_json_data,
                },
              });
            }}
          >
            <View
              style={{
                padding: 15,
                borderBottomWidth: 1,
                borderColor: "#eee",
                backgroundColor: "#7F00FF",
              }}
            >
              <Text style={styles.chapter_no}>অধ্যায় {item.chapter_no}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page_contsiner: {
    flex: 1,
    paddingHorizontal: scale(10),
    paddingBottom: verticalScale(10),
  },
  book_name: {
    fontSize: moderateScale(22),
    margin: moderateScale(10),
    textAlign: "center",
    fontFamily: "NotoSerifBengali_400Regular",
  },
  chapter_no: {
    color: "white",
    fontFamily: "NotoSerifBengali_400Regular",
    fontSize: scale(18),
    textAlign: "center",
  },
});
