import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
  Alert,
  Snackbar,
} from "@mui/material";

const LandingPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [showBanner, setShowBanner] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitStatus("error");
      setShowBanner(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Replace this URL with your deployed Google Apps Script web app URL
      const SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbxjsqxfHWxmjDjs4VkOsEFE4KHV-AA43xN-Q0SPfsVeEzvgzvDGhmEUNqjPkKFG9067/exec";

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Important because Google Apps Script doesn't support CORS
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setSubmitStatus("success");
      setShowBanner(true);
      setEmail("");
    } catch (error) {
      console.error("Error submitting email:", error);
      setSubmitStatus("error");
      setShowBanner(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseBanner = () => {
    setShowBanner(false);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Stack spacing={6} alignItems="center" textAlign="center" sx={{ p: 4 }}>
        <Box>
          <Typography
            fontSize="64px"
            sx={{ mb: 2, lineHeight: 1 }}
            role="img"
            aria-label="sun"
          >
            🌞
          </Typography>
          <Stack spacing={1}>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              component="h1"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "var(--black-light)",
              }}
            >
              Remember people,
            </Typography>
            <Typography
              variant={isMobile ? "h4" : "h3"}
              component="h1"
              fontWeight="bold"
              gutterBottom
              sx={{
                color: "var(--orange-secondary)",
                textDecoration: "line-through",
              }}
            >
              not data points.
            </Typography>
          </Stack>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: 4,
            background: "white",
            maxWidth: "sm",
            width: "100%",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{ color: "var(--orange-primary)" }}
          >
            <strong>Hae is a chat-based personal CRM tool.</strong>
          </Typography>
          <Typography color="text.secondary" paragraph>
            Just speak or text to update your contacts, log interactions, and
            retrieve relationship insights. No forms or complex interfaces
            needed.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              mt: 3,
              display: "flex",
              gap: 1,
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                flex: 1,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                },
              }}
            />
            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={isSubmitting}
              sx={{
                minWidth: isMobile ? "100%" : "150px",
                height: "56px",
                backgroundColor: "var(--orange-secondary)",
                "&:hover": {
                  backgroundColor: "var(--orange-primary)",
                  boxShadow: "0 4px 24px rgba(255, 155, 80, 0.5)",
                },
                "&:disabled": {
                  backgroundColor: "grey.400",
                },
                boxShadow: "none",
                textTransform: "none",
              }}
            >
              {isSubmitting ? "Submitting..." : "Join Waitlist"}
            </Button>
          </Box>
        </Paper>
      </Stack>
      <Snackbar
        open={showBanner}
        autoHideDuration={6000}
        onClose={handleCloseBanner}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseBanner}
          icon={false}
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor:
              submitStatus === "success"
                ? "var(--orange-secondary)"
                : "var(--red-error)",
            color: "white",
          }}
        >
          {submitStatus === "success"
            ? "Welcome to the Hae team! We'll be in touch soon."
            : "Oops! Please try again."}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          textAlign: "center",
          ...(isMobile && {
            pb: 2,
          }),
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 Hae | All rights reserved
        </Typography>
      </Box>
    </Container>
  );
};

export default LandingPage;
