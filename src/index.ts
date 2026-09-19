import { Elysia, file } from "elysia";
import * as v from 'valibot'
import { $ } from "bun";

const app = new Elysia().get("/centralimg", async ({ query }) => {
	set.headers['Cache-Control'] =
		'no-store, no-cache, must-revalidate, proxy-revalidate'
	set.headers['Pragma'] = 'no-cache'
	set.headers['Expires'] = '0'
  const default_config = {
    "working_directory": "/opt/LRIMa-central",
    "filename_of_repo": "iot_stuff",
    "standard_logs": "/var/log/LRIMa-central/standard.log",
    "error_logs": "/var/log/LRIMa-central/error.log",
    "bluetooth_controller_name": "LRIMa-Central-3",
    "obj_id": "Object_id",
    "auth_token": "very_secret_auth_token",
    "wifi_ssid": "wifi",
    "wifi_password": "password",
    "hostname": "LRIMa-Central-3",
    "account_name": "Sire patate",
    "account_password": "et son royaume",
    "wifi_country": "CA"
  }


  const user_config = Object.assign({}, default_config, query);

  const script_path = "~/Documents/prog/image-culture/culture-raspimage-convert/useful_scripts/create_img.sh";
  const config_path = "~/Documents/prog/image-culture/culture-raspimage-convert/config.json";
  const image_path = "/home/lrima/Documents/prog/image-culture/culture-raspimage-convert/2026-04-21-raspios-trixie-arm64-lite.img";

  await Bun.write(config_path, JSON.stringify(user_config));
  await $`${script_path}`;

  console.log("Complete");

  return file(image_path);
const app = new Elysia().get("/centralimg", async ({ query, status }) => {
	const default_config = {
		"working_directory": "/opt/LRIMa-central",
		"filename_of_repo": "iot_stuff",
		"standard_logs": "/var/log/LRIMa-central/standard.log",
		"error_logs": "/var/log/LRIMa-central/error.log",
		"bluetooth_controller_name": "LRIMa-Central-3",
		"obj_id": "Object_id",
		"auth_token": "very_secret_auth_token",
		"wifi_ssid": "wifi",
		"wifi_password": "password",
		"hostname": "LRIMa-Central-3",
		"account_name": "Sire_patate",
		"account_password": "et son royaume",
		"wifi_country": "CA"
	}


	const user_config = Object.assign({}, default_config, query);

	const script_path = Bun.file("/home/lrima/Documents/prog/image-culture/culture-raspimage-convert/useful_scripts/create_img.sh");
	const config_path = Bun.file("/home/lrima/Documents/prog/image-culture/culture-raspimage-convert/config.json");
	const image_path = "/home/lrima/Documents/prog/image-culture/culture-raspimage-convert/2026-04-21-raspios-trixie-arm64-lite.img";

	await Bun.write(config_path, JSON.stringify(user_config));
	const result = await $`${script_path}`;
	if (result.exitCode != 0) {
		return status(400, 'Error in given config file')
	}

	console.log("Complete");

	return file(image_path);
}, {
	query: v.object({
		obj_id: v.string(),
		auth_token: v.string(),
		wifi_ssid: v.string(),
		wifi_password: v.string(),
	})
}).listen(6767);

console.log(
	`Imager API running at ${app.server?.hostname}:${app.server?.port} `
);
