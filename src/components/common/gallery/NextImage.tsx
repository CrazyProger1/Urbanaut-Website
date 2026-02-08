import Image from "next/image";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
  type RenderSlideProps,
  type SlideImage,
} from "yet-another-react-lightbox";

const isNextImage = (slide: SlideImage): slide is SlideImage => {
  return isImageSlide(slide) && typeof slide.width === "number" && typeof slide.height === "number";
};

type Props = RenderSlideProps<SlideImage>;

export const NextImage = ({ slide, offset, rect }: Props) => {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextImage(slide)) return undefined;

  const width = !cover
    ? Math.round(Math.min(rect.width, (rect.height / slide.height!) * slide.width!))
    : rect.width;

  const height = !cover
    ? Math.round(Math.min(rect.height, (rect.width / slide.width!) * slide.height!))
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt=""
        src={slide.src}
        loading="eager"
        draggable={false}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={offset === 0 ? () => click?.({ index: currentIndex }) : undefined}
      />
    </div>
  );
};
