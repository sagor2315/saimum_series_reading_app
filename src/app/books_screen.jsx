import * as FileSystem from "expo-file-system";

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { getCachedData } from "../utils/dataCache";

const REMOTE_URL =
  "https://cdn.jsdelivr.net/gh/sagor2315/saimum-assets/json/saimum_series_all_books.json";

// const DIR = FileSystem.documentDirectory + "saimum-series/";
// const FILE = DIR + "saimum_books.json";

const DIR = FileSystem.documentDirectory + "book_cache/";
const FILE = DIR + "books.json";

export default function BooksScreen() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("Initializing...");

  // 1) local derectory check
  // const ensureDir = async () => {
  //   setStatus("Checking cache folder...");
  //   const info = await FileSystem.getInfoAsync(DIR);
  //   if (!info.exists) {
  //     setStatus("Creating cache folder...");
  //     await FileSystem.makeDirectoryAsync(DIR, { intermediates: true });
  //   }
  // };

  // 2) Fetch Online and return JSON array
  // const fetchAndCache = async () => {
  //   setStatus("Fetching from server...");
  //   try {
  //     const resp = await fetch(REMOTE_URL);
  //     if (!resp.ok) throw new Error("Server response not OK");
  //     const json = await resp.json();
  //     const arr = json.books;
  //     setStatus("Saving to cache...");
  //     await FileSystem.writeAsStringAsync(FILE, JSON.stringify(arr), {
  //       encoding: FileSystem.EncodingType.UTF8,
  //     });
  //     setStatus("Data fetched & cached");
  //     return arr;
  //   } catch (e) {
  //     console.warn("Fetch failed:", e);
  //     setStatus("Fetch failed");
  //     return null;
  //   }
  // };

  // 3) if fetch failed then read from local and return array
  // const loadFromCache = async () => {
  //   setStatus("Loading from cache...");
  //   try {
  //     const info = await FileSystem.getInfoAsync(FILE);
  //     if (!info.exists) throw new Error("No cache file");
  //     const text = await FileSystem.readAsStringAsync(FILE, {
  //       encoding: FileSystem.EncodingType.UTF8,
  //     });
  //     setStatus("Loaded from cache");
  //     return JSON.parse(text);
  //   } catch (e) {
  //     console.warn("Cache load failed:", e);
  //     setStatus("Cache load failed");
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   (async () => {
  //     // prepare cache folder
  //     await ensureDir();

  //     // check network
  //     const net = await Network.getNetworkStateAsync();
  //     let arr = null;

  //     if (net.isConnected && net.isInternetReachable) {
  //       // fetch online and cache
  //       arr = await fetchAndCache();
  //     }
  //     if (!arr) {
  //       // if fetch failed then read from local
  //       arr = await loadFromCache();
  //     }
  //     if (arr) {
  //       setBooks(arr);
  //     }
  //     setLoading(false);
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      setStatus("Loading books...");
      const arr = await getCachedData(REMOTE_URL, FILE, "books");
      setBooks(arr || []);
      setLoading(false);
      setStatus(arr ? "Loaded." : "Failed to load books.");
    })();
  }, []);

  const goDetails = (item) => {
    // router.prefetch({
    //   pathname: "/details_page",
    //   params: {
    //     id: item?.id,
    //     book_json_data: item?.book_json_data,
    //   },
    // });
    router.push({
      pathname: "/details_page",
      params: {
        id: item?.id,
        book_json_data: item?.book_json_data,
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8 }}>{status}</Text>
      </View>
    );
  }

  if (books.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No books available.</Text>
        <Text style={{ marginTop: 8, color: "#888" }}>{status}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 8,
        }}
      >
        <TouchableOpacity onPress={() => setForceRefresh(true)}>
          <Text className="font-medium text-xl bg-[#7F00FF] text-white px-8 py-2 rounded-full">
            Clear Cache
          </Text>
        </TouchableOpacity>
      </View> */}
      {/* <View>
        <Text>{JSON.stringify(books, null, 2)}</Text>
      </View> */}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => goDetails(item)}>
            <View className="text-wrap" style={styles.item}>
              <View>
                <Image
                  src={item?.cover}
                  resizeMethod="contain"
                  style={{ height: verticalScale(200), width: scale(135) }}
                />
              </View>
              <View>
                <Text style={styles.title} className="">
                  {item?.name}
                </Text>
                {/* <Text style={styles.writer}>লেখক: {item?.writer}</Text> */}
                <Text style={styles.writer} className="">
                  মোট অধ্যায় {item?.total_chapters}
                </Text>

                <View className="flex-row items-center bg-[#7F00FF] p-3 mt-[10]">
                  <Text
                    className="text-white text-lg mr-2"
                    style={{ fontFamily: "NotoSerifBengali_400Regular" }}
                  >
                    সম্পূর্ণ বই পড়ুন
                  </Text>
                  <Ionicons name="arrow-forward" size={24} color="white" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: moderateScale(16),
  },
  item: {
    flexDirection: "row",
    gap: moderateScale(10),
    // backgroundColor: "#fff",
    padding: moderateScale(5),
    borderRadius: moderateScale(8),
    marginBottom: verticalScale(12),
    overflow: "hidden",
    // elevation: 2,
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    fontFamily: "NotoSerifBengali_400Regular",
  },
  writer: {
    marginTop: verticalScale(6),
    fontSize: moderateScale(16),
    color: "#000000",
    fontFamily: "NotoSerifBengali_400Regular",
  },
  statusBar: {
    padding: moderateScale(6),
    backgroundColor: "#eef",
    textAlign: "center",
  },
});
