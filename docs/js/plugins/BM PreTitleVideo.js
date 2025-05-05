/*:
 * @target MZ
 * @plugindesc Plays a video before the title screen. Skips title if desired.
 * @author ChatGPT
 *
 * @param Video Filename
 * @desc The name of the .webm video file (do not include extension).
 * @default overhill_intro
 *
 * @param Skip Title Screen
 * @type boolean
 * @desc Whether to skip the title screen after playing the video.
 * @default false
 */

(() => {
    const parameters = PluginManager.parameters("PreTitleVideo");
    const videoFilename = parameters["Video Filename"] || "overhill_intro";
    const skipTitle = parameters["Skip Title Screen"] === "true";

    const alias_Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        Scene_Base.prototype.start.call(this);
        SoundManager.preloadImportantSounds();
        if (DataManager.isBattleTest()) {
            DataManager.setupBattleTest();
            SceneManager.goto(Scene_Battle);
        } else if (DataManager.isEventTest()) {
            DataManager.setupEventTest();
            SceneManager.goto(Scene_Map);
        } else {
            this.checkPlayerLocation();
            DataManager.setupNewGame();
            this.playTitleVideo();
        }
    };

    Scene_Boot.prototype.playTitleVideo = function () {
        const video = document.createElement("video");
        video.src = `movies/${videoFilename}.webm`;
        video.autoplay = true;
        video.volume = 1.0;
        video.style.position = "absolute";
        video.style.top = 0;
        video.style.left = 0;
        video.style.width = "100%";
        video.style.height = "100%";
        video.style.zIndex = 100;
        video.style.backgroundColor = "black";
        video.setAttribute("playsinline", "");
        document.body.appendChild(video);

        video.onended = () => {
            document.body.removeChild(video);
            if (skipTitle) {
                SceneManager.goto(Scene_Map);
            } else {
                SceneManager.goto(Scene_Title);
            }
        };

        video.onerror = (e) => {
            console.error("Failed to load intro video:", video.src);
            document.body.removeChild(video);
            SceneManager.goto(Scene_Title);
        };
    };
})();
