import { useCallback, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { Breadcrumbs, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { FolderOpen, List, House } from "lucide-react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getData } from "@/services/api";

const BreadCrumbsHeader = () => {
  const { listId, spacingId } = useParams();
  const location = useLocation();
  const [nameList, setNameList] = useState("");
  const [nameSpacing, setNameSpacing] = useState("");
  const [breadcrumb, setBreadcrumb] = useState([]);
  const theme = useTheme();

  const fetchData = useCallback(async () => {
    try {
      if (spacingId) {
        setNameSpacing(
          await getData(`api/clickfzt/spacing/${spacingId}`).then(
            (data) => data.title
          )
        );
      }

      if (listId) {
        setNameList(
          await getData(`api/clickfzt/list/${listId}`).then(
            (data) => data.title
          )
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [listId, spacingId]);

  useEffect(() => {
    if (listId || spacingId) {
      fetchData();
    }
  }, [listId, spacingId, fetchData]);

  useEffect(() => {
    const pathSegments = location.pathname.split("/").filter(Boolean); // Divide la ruta actual y elimina valores vacíos
    const breadcrumbItems = [];

    // Home (siempre presente)
    breadcrumbItems.push({
      label: "Click-FZT",
      path: "/clickFZT/inicio",
      icon: <House color={theme.palette.primary.secondary} size={20} />,
    });

    // Espacio (si existe spacingId)
    if (spacingId && pathSegments.includes(spacingId)) {
      breadcrumbItems.push({
        label: nameSpacing,
        path: `/clickFZT/spacing/${spacingId}`,
        icon: <FolderOpen color={theme.palette.primary.secondary} size={20} />,
      });
    }

    // Lista (si existe listId)
    if (listId && pathSegments.includes(listId)) {
      breadcrumbItems.push({
        label: nameList,
        path: `/clickFZT/spacing/${spacingId}/list/${listId}`,
        icon: <List color={theme.palette.primary.secondary} size={20} />,
      });
    }

    setBreadcrumb(breadcrumbItems);
  }, [location.pathname, nameSpacing, nameList, spacingId, listId, theme]);

  return (
    <Grid
      sx={{
        pl: 1,
      }}
      container
    >
      <Grid size={{ xs: 12 }}>
        <Breadcrumbs>
          {breadcrumb.map((item, index) => (
            <Box key={index} display="flex" alignItems="center">
              <Box display="flex" alignItems="center">
                {item.icon}
              </Box>
              <Typography
                variant="body2"
                color="black"
                component={Link}
                to={item.path}
                sx={{
                  ml: 1,
                  fontSize: "1rem",
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  alignItems: "center", // Asegura la alineación vertical del texto
                  "&:hover": {
                    textDecoration: "underline", // Subrayado en hover
                  },
                }}
              >
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
