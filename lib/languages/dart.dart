// // AssetsApi assetsApi = AssetsApi(ApiClient(basePath: 'http://localhost:1000'));
// // Assets assetsSnapshot = await assetsApi.assetsSnapshot();
// // List<Asset> assetCount = assetsSnapshot.iterable;
//
// // ignore_for_file: omit_local_variable_types
//
// import 'package:core_openapi/api/asset_api.dart';
// import 'package:core_openapi/api/assets_api.dart' hide Tags;
// import 'package:core_openapi/api_client.dart';
//
// /// Recipe #3: I want to get a list of all of my code assets
//
// String host = 'http://localhost:1000';
// AssetsApi assetsApi = AssetsApi(ApiClient(basePath: host));
// AssetApi assetApi = AssetApi(ApiClient(basePath: host));
//
// Future<void> dart() async {
//   /// (2) snapshot
//   final assetsSnapshot = await assetsApi.assetsSnapshot();
//
//   List<Asset> assetCount = assetsSnapshot.iterable;
//
//   /// dart
//   List<Asset> filterDart = assetCount
//       .where((element) =>
//           element.original.reference?.classification.specific == ClassificationSpecificEnum.dart)
//       .toList();
//
//   int languageLength = filterDart.length;
// }
