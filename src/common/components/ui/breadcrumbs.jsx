import { useCallback, useEffect, useState } from "react";
import { Breadcrumbs, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FolderOpen, List } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { getData } from "@/services/api";

const BreadCrumbsHeader = () => {
  const { listId, spacingId } = useParams();
  const [nameList, setNameList] = useState("");
  const [nameSpacing, setNameSpacing] = useState("");
  const [breadcrumb, setBreadcrumb] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      if (spacingId) {
        setNameSpacing(
          await getData(`api/clickup/spacing/${spacingId}`).then(
            (data) => data.title
          )
        );
      }

      if (listId) {
        setNameList(
          await getData(`api/clickup/list/${listId}`).then((data) => data.title)
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [listId, spacingId]);

  useEffect(() => {
    if (listId && spacingId) {
      fetchData();
    }
  }, [listId, spacingId, fetchData]);

  useEffect(() => {
    const breadcrumbItems = [];
    if (nameSpacing) {
      breadcrumbItems.push({
        label: nameSpacing,
        icon: <FolderOpen sx={{ mr: 1, color: "text.secondary" }} />,
      });
    }
    if (nameList) {
      breadcrumbItems.push({
        label: nameList,
        icon: <List sx={{ mr: 1, color: "text.secondary" }} />,
      });
    }
    setBreadcrumb(breadcrumbItems);
  }, [nameList, nameSpacing]);

  return (
    <Grid container>
      <Grid
        sx={{
          padding: "0px 0px 5px 0px",
        }}
      >
        <Breadcrumbs>
          {breadcrumb.map((item, index) => (
            <Box key={index} display="flex" alignItems="center">
              {item.icon}
              <Typography variant="body2" color="black">
                {item.label}
              </Typography>
            </Box>
          ))}
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
};

export default BreadCrumbsHeader;
