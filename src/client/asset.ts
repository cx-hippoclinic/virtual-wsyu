import { Env } from "@ancademy/vse-client";
import { deriveObject } from "@client/util";
import assetMeta from "./asset.json";

const ASSET_BASE_URL = `${Env.basePath}/static/asset/`;

export const Asset = deriveObject(assetMeta, (val) => `${ASSET_BASE_URL}/${val}`);
