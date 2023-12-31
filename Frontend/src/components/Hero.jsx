const Hero = () => {
  return (
    <>
      <div
        style={{ padding: "56.25% 0 0 0", position: "relative", zIndex: -1 }}
      >
        <iframe
          src="https://player.vimeo.com/video/893101387?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&autoplay=1&muted=1&portrait=0&byline=0&title=0&controls=0&loop=1"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 100 + "%",
            height: 100 + "%",
            zIndex: 1,
          }}
          title="epl_intro"
        ></iframe>
      </div>
      <script src="https://player.vimeo.com/api/player.js"></script>
    </>
  );
};

export default Hero;
