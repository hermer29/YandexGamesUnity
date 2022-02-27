using System.Runtime.InteropServices;

namespace Agava.YandexGames
{
    public class Device
    {
        public static DeviceType Type => (DeviceType)DeviceGetType();

        [DllImport("__Internal")]
        private static extern int DeviceGetType();
    }
}
