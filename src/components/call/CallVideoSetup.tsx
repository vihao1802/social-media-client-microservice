import {
  DeviceSettings,
  useCall,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CallVideoSetup = ({
  setIsSetUpComplete,
}: {
  setIsSetUpComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
  const call = useCall();
  const router = useRouter();
  if (!call) {
    throw new Error("usecall must be used within a StreamCall component");
  }

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <div className="w-[500px] h-[375px] rounded">
        <VideoPreview className="!border-[0px] !border-white !bg-[#181A1E]" />
      </div>
      <div className="flex items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium">
          <input
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => {
              setIsMicCamToggledOn(e.target.checked);
            }}
          />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>

      <div className="flex flex-row gap-3">
        <button
          className="rounded-md text-blue-500 px-4 py-2.5"
          onClick={async () => {
            await call.leave();
            router.push("/messages");
          }}
        >
          Exit setup
        </button>
        <button
          className="rounded-md bg-green-500 px-4 py-2.5 hover:bg-green-400"
          onClick={() => {
            call.join();
            setIsSetUpComplete(true);
          }}
        >
          Join meeting
        </button>
      </div>
    </div>
  );
};

export default CallVideoSetup;
