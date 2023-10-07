using System.Collections;
using NUnit.Framework;
using UnityEngine.TestTools;

namespace Agava.YandexGames.Tests
{
    public class ReviewPopupTests
    {
        [UnitySetUp]
        public IEnumerator InitializeSdk()
        {
            if (!YandexGamesSdk.IsInitialized)
                yield return YandexGamesSdk.Initialize(SdkTests.TrackSuccessCallback);
        }

        [Test]
        public void CanReviewShouldNotThrow()
        {
            Assert.DoesNotThrow(() => ReviewPopup.CanRequestReview());
        }

        [Test]
        public void ReviewShouldNotThrow()
        {
            Assert.DoesNotThrow(() => ReviewPopup.RequestReview());
        }
    }
}
