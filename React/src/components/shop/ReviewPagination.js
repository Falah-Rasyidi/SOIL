import React, { useState } from "react";
import { Pagination } from "@mui/material";
import { Rating, Button } from "@mui/material";

function ReviewPagination() {
  // Sample data array
  const [data, setData] = useState(
    Array.from(
      { length: 31 },
      (_, index) => `This is a great product! ${index + 1}`
    )
  );

  // Pagination state
  const [page, setPage] = useState(1);
  const itemsPerPage = 2;

  // Calculate pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);

  // Change page handler
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="box-row-review-description">
      {/* Render paginated data */}
      <div className="review-description-row">
        {paginatedData.map((item, index) => (
          <div className="review-description-column">
            <div className="review-description-title">
              {/* Title of review */}
              <h5 key={index}>{item}</h5>
              {/* edit button*/}
              <div className="review-description-title-buttons">
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    marginLeft: "2%",
                    color: "#4392F1",
                  }}
                >
                  <span>Edit</span>
                </Button>
                {/* delete button */}
                <Button
                  size="small"
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    marginLeft: "2%",
                    padding: "4px 4px",
                  }}
                  color="error"
                >
                  <span>Delete</span>
                </Button>
              </div>
            </div>
            {/* Div for subtitle information */}
            <div className="review-description-column-subtitle">
              {/* Div for image */}
              <div className="review-description-column-subtitle-img">
                <img
                  src="/images/unsplash_watermelon.jpg"
                  alt="profile-pic"
                ></img>
              </div>
              {/* Div for author and rating */}
              <div className="review-description-column-subtitle-text">
                {/* Author */}
                <h6 className="review-author">Natchanon Rasyidi</h6>
                {/* Rating component */}
                <Rating value={3.4} precision={0.1} size="small" readOnly />
              </div>
            </div>
            {/* This is 100 words review */}
            <p key={index}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec quam felis, ultricies nec, pellentesque eu, pretium quis,
              sem. Nulla consequat massa quis enim. Donec pede justo, fringilla
              vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,
              imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
              mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum
              semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula,
              porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem
              ante, dapibus in, viverra quis, feugiat a,
            </p>
          </div>
        ))}
      </div>

      {/* Pagination component */}
      <div className="review-description-row-pagination">
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          showFirstButton
          showLastButton
          shape="rounded"
        />
      </div>
    </div>
  );
}

export default ReviewPagination;
