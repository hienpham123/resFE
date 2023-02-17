import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { axiosAuth } from "../utills/axios";
import SortObj from "./SortObj";
import useNotification from "./notification";
import Loader from "./Loading";

function showvoteS(maxStar = 0) {
  const listStar = [];
  for (let i = 0; i < 5; i++) {
    maxStar <= i
      ? listStar.push(
          <StarOutlineRoundedIcon
            key={i}
            className="star"
            style={{ color: "black" }}
          />
        )
      : listStar.push(<StarRoundedIcon key={i} className="star" />);
  }
  return listStar;
}
export default function Vote({
  votes = [],
  restaurant_id = false,
  load = () => {},
}) {
  const [value, setValue] = React.useState(5);
  const [description, setDescription] = React.useState("");
  const [msg, sendNotification] = useNotification();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChange = (e) => {
    setDescription(e.value);
  };
  votes.sort(SortObj("id"));
  const handleVote = () => {
    if (!localStorage.getItem("token")) {
      sendNotification({
        msg: "Vui lòng đăng nhập!",
        variant: "warning",
      });
      return;
    }
    if (!value || !description) {
      sendNotification({
        msg: "Bạn chưa nhập nội dung đánh giá!",
        variant: "warning",
      });
      return;
    }
    let bodyFormData = new FormData();
    bodyFormData.set("vote", value);
    bodyFormData.set("discription", description);
    bodyFormData.set("restaurant_id", restaurant_id);
    setIsLoading(true);
    axiosAuth
      .post("api/vote", bodyFormData)
      .then((response) => response)
      .then(function (data) {
        load();
        setValue(null);
        setDescription("");
        setIsLoading(false);
      });
  };
  return (
    <>
      {isLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <Box
            id="danhgia"
            sx={{
              "& > legend": { mt: 2 },
            }}
            className="voteres"
          >
            <Typography component="legend">Đánh Giá Nhà hàng</Typography>
            <Rating
              sx={{ fontSize: "3rem" }}
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <div style={{ width: "100%" }}>
              <TextareaAutosize
                aria-label="minimum height"
                minRows={3}
                placeholder="Nhận xét về nhà hàng..."
                value={description}
                style={{ width: "100%" }}
                onChange={(e) => {
                  handleChange(e.target);
                }}
              />
            </div>
            <Button
              variant="contained"
              onClick={() => {
                handleVote();
              }}
            >
              Đánh giá
            </Button>
          </Box>

          <Box>
            <h3
              style={{
                textTransform: "uppercase",
                fontWeight: "bold",
                color: "#f51167",
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              ĐÁNH GIÁ
            </h3>
            <div>
              {votes.map((e, index) => {
                return (
                  <Card
                    key={index}
                    sx={{ minWidth: 275, mb: "7px", maxHeight: 120 }}
                  >
                    <CardContent>
                      <Typography
                        variant="h5"
                        component="div"
                        style={{ fontSize: 18, fontWeight: "bold" }}
                      >
                        {e.is_user.name}
                      </Typography>
                      <Typography
                        sx={{ fontSize: 14, color: "#faaf00" }}
                        gutterBottom
                      >
                        {showvoteS(Number(e.vote)).map((e) => e)}
                      </Typography>
                      <Typography variant="body2">{e.discription}</Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </Box>
        </>
      )}
    </>
  );
}
