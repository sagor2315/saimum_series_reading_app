import { Link } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";

const Index = () => {
  return (
    <View className="flex-1 justify-center items-center bg-red-100 w-full">
      <View
        className="flex-1 justify-between items-center w-11/12"
        style={{ paddingVertical: verticalScale(48) }}
      >
        <View
          className="justify-center items-center"
          style={{ gap: moderateScale(5) }}
        >
          <Image
            source={require("../assets/images/home.png")}
            resizeMode="contain"
            className="rounded-md"
            style={{ width: moderateScale(288), height: verticalScale(288) }}
          />
          <View className="items-center">
            <Text
              className=" text-red-800 text-Siyam_Rupali"
              style={{
                fontFamily: "NotoSerifBengali_400Regular",
                paddingTop: verticalScale(1),
                fontSize: moderateScale(30),
              }}
            >
              সাইমুম সিরিজ
            </Text>
            <Text
              className=" text-red-800"
              style={{
                fontFamily: "NotoSerifBengali_400Regular",
                fontSize: moderateScale(18),
              }}
            >
              আবুল আসাদ
            </Text>
          </View>
        </View>

        <Link
          href={"/books_screen"}
          className="bg-[#7F00FF] w-full rounded"
          style={{
            paddingVertical: verticalScale(16),
            paddingHorizontal: scale(56),
            fontFamily: "NotoSerifBengali_400Regular",
          }}
        >
          <Text className="text-white text-center text-xl">পড়া শুরু করুন</Text>
        </Link>
      </View>
    </View>
  );
};

export default Index;
