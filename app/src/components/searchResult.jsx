
import styled from "styled-components";
import { BASE_URL } from "../constants";

const getImageUrl = (image) => {
  if (!image) return "";

  // If the image is already an absolute URL, use it directly.
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }

  // Remove extra slashes to create a valid URL.
  return `${BASE_URL.replace(/\/$/, "")}/${image.replace(/^\//, "")}`;
};

const SearchResult = ({ data }) => {
  return (
    <FoodCardContainer>
      <Container>
        <FoodCards>
          {data?.map(({ _id, name, image, text, price }) => (
            <FoodCard key={_id}>
              <div className="food_image">
                <img
                  src={getImageUrl(image)}
                  alt={name}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";

                    const fallback =
                      e.currentTarget.parentElement.querySelector(
                        ".image_fallback"
                      );

                    if (fallback) {
                      fallback.style.display = "flex";
                    }
                  }}
                />

                <div className="image_fallback">
                  Image unavailable
                </div>
              </div>

              <div className="food_info">
                <div className="info">
                  <h3>{name}</h3>
                  <p>{text}</p>
                </div>

                <PriceButton>
                  ${Number(price).toFixed(2)}
                </PriceButton>
              </div>
            </FoodCard>
          ))}
        </FoodCards>
      </Container>
    </FoodCardContainer>
  );
};

export default SearchResult;

// Main container
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

// Background section
const FoodCardContainer = styled.section`
  min-height: calc(100vh - 210px);
  background-image: url("/bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

// Food cards layout
const FoodCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 30px 20px;
  padding: 20px 0;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

// Individual food card
const FoodCard = styled.div`
  width: 100%;
  min-height: 180px;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  gap: 15px;

  padding: 15px;

  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.12);

  backdrop-filter: blur(13px);
  -webkit-backdrop-filter: blur(13px);

  color: white;

  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.2);
  }

  .food_image {
    flex-shrink: 0;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.15);

    img {
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
      border-radius: 50%;
    }

    .image_fallback {
      display: none;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 11px;
      color: white;
    }
  }

  .food_info {
    flex: 1;
    min-width: 0;
    min-height: 145px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    .info {
      width: 100%;
    }

    h3 {
      margin: 3px 0 8px;
      font-size: 17px;
      font-weight: 700;
      line-height: 1.3;
      overflow-wrap: anywhere;
    }

    p {
      margin: 0;
      font-size: 13px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.9);
      overflow-wrap: anywhere;
    }
  }

  @media (max-width: 400px) {
    gap: 12px;
    padding: 12px;

    .food_image {
      width: 85px;
      height: 85px;
    }

    .food_info {
      min-height: 130px;
    }

    .food_info h3 {
      font-size: 15px;
    }

    .food_info p {
      font-size: 12px;
    }
  }
`;

// Price button
const PriceButton = styled.button`
  background: #ff4343;
  border-radius: 6px;
  padding: 8px 15px;
  border: none;

  color: white;
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  &:hover {
    background: #e92f2f;
  }
`;
