import * as FileSystem from "expo-file-system";
import * as Network from "expo-network";

export async function ensureDir(dir) {
  const info = await FileSystem.getInfoAsync(dir);
  if (!info.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
}

export async function fetchAndCache(remoteUrl, filePath, key = null) {
  try {
    const resp = await fetch(remoteUrl, {
      cache: "no-store",
    });
    if (!resp.ok) throw new Error("Server response not OK");
    const json = await resp.json();
    // if key given, save that property only (like json.books)
    const data = key ? json[key] : json;
    await FileSystem.writeAsStringAsync(filePath, JSON.stringify(data), {
      encoding: FileSystem.EncodingType.UTF8,
    });
    return data;
  } catch (e) {
    console.warn("Fetch failed:", e);
    return null;
  }
}

export async function loadFromCache(filePath) {
  try {
    const info = await FileSystem.getInfoAsync(filePath);
    if (!info.exists) throw new Error("No cache file");
    const text = await FileSystem.readAsStringAsync(filePath, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    return JSON.parse(text);
  } catch (e) {
    console.warn("Cache load failed:", e);
    return null;
  }
}

/**
 * Try online fetch, fallback to cache, always save/update cache if fetched.
 * @param {*} remoteUrl
 * @param {*} filePath
 * @param {*} key   // e.g., "books" if you want json.books
 * @returns data
 */
export async function getCachedData(remoteUrl, filePath, key = null) {
  // prepare folder
  const dir = filePath.substring(0, filePath.lastIndexOf("/"));
  await ensureDir(dir);

  // check network
  let data = null;
  try {
    const net = await Network.getNetworkStateAsync();
    if (net.isConnected && net.isInternetReachable) {
      data = await fetchAndCache(remoteUrl, filePath, key);
    }
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    /* ignore */
  }

  if (!data) {
    data = await loadFromCache(filePath);
  }
  return data;
}
