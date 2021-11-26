const library = {
  $yandexGames: {
    sdk: undefined,
  },

  // External C# call.
  Initialize: function () {
    const sdkScript = document.createElement('script');
    sdkScript.src = 'https://yandex.ru/games/sdk/v2';
    document.head.appendChild(sdkScript);

    sdkScript.onload = function () {
      window['YaGames'].init().then(function (sdk) {
        yandexGames.sdk = sdk;
      });
    }
  },

  // External C# call.
  VerifyInitialization: function () {
    return yandexGames.sdk !== undefined;
  },

  // External C# call.
  ShowInterestialAd: function (openCallbackPtr, closeCallbackPtr, errorCallbackPtr, offlineCallbackPtr) {
    yandexGames.sdk.adv.showFullscreenAdv({
      callbacks: {
        onOpen: function () {
          dynCall('v', openCallbackPtr, []);
        },
        onClose: function (wasShown) {
          dynCall('vi', closeCallbackPtr, [wasShown]);
        },
        onError: function (error) {
          const errorMessage = error.message;
          const errorMessageBufferSize = lengthBytesUTF8(errorMessage) + 1;
          const errorMessageBufferPtr = _malloc(errorMessageBufferSize);
          stringToUTF8(errorMessage, errorMessageBufferPtr, errorMessageBufferSize);
          dynCall('vii', errorCallbackPtr, [errorMessageBufferPtr, errorMessageBufferSize]);
          _free(errorMessageBufferPtr);
        },
        onOffline: function () {
          dynCall('v', offlineCallbackPtr, []);
        },
      }
    });
  },

  // External C# call.
  ShowVideoAd: function () {
    yandexGames.sdk.adv.showRewardedVideo();
  },
}

autoAddDeps(library, '$yandexGames');
mergeInto(LibraryManager.library, library);
