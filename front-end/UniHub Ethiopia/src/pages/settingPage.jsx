import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { BASE_URL } from "@/api/config";
import { useRef, useState } from "react";
import { userApi } from "@/api";
import { requestHandler } from "@/utils/requestHandler";
import { Loader } from "rsuite";

export default function Component() {
  const { isAuthenticated, user } = useAuth();
  const hiddenFileInput = useRef(null);
  const [profile, setProfile] = useState();
  const [data, setData] = useState({
    name: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    profile: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleDataChange = (name) => (e) => {
    setData({
      ...data,
      [name]: e.target.value,
    });
  };

  const handleProfileClick = (e) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    const fileUploaded = e.target.files[0];
    console.log(fileUploaded);
    const fileReader = new FileReader();

    fileReader.readAsDataURL(fileUploaded);
    fileReader.onload = () => {
      setProfile(fileReader.result);
    };

    const formData = new FormData();
    if (fileUploaded)
      formData.append("profile", fileUploaded, fileUploaded.name);
    data.name ? formData.append("name", data.name) : null;
    setData(formData);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
    if (!data.oldPassword) {
      newErrors.oldPassword = "Password is required";
      valid = false;
    }

    if (!data.newPassword) {
      newErrors.newPassword = "New password is required";
      valid = false;
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
      valid = false;
    }

    if (data.newPassword !== data.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (valid) {
      const response = await requestHandler(
        async () =>
          await userApi.updatePassword(
            {
              oldPassword: data.oldPassword,
              newPassword: data.newPassword,
            },
            user._id,
          ),
        setIsLoading,
        () => {
          window.location.reload();
        },
        (err) => {
          console.log(err);
        },
      );

      if (!response.success) {
        if (response.data.message) {
          newErrors["confirmPassword"] = response.data.message;
        }

        response.data.errors?.map((err) => {
          newErrors[err.path] = err.msg;
        });

        setErrors(newErrors);
        console.log(errors);
        return;
      }
    } else {
      setErrors(newErrors);
      return;
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const response = await requestHandler(
      async () => await userApi.uploadProfile(data, user._id),
      setIsLoading,
      (res) => {
        console.log(res);
        window.location.reload();
      },
      (err) => {
        console.log(err);
      },
    );
    console.log(response);
  };

  return (
    <div className="w-full max-w-6xl pt-20 mx-auto">
      <div className="container mx-auto px-4 md:px-6 py-12 max-w-4xl">
        <div className="grid gap-12">
          <div>
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <p className="text-muted-foreground">
              Manage your profile information and account settings.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Update your profile information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20 border">
                    <AvatarImage
                      src={
                        profile ? profile : BASE_URL + "uploads/" + user.profile
                      }
                      alt="@shadcn"
                      className="object-cover"
                    />
                    <AvatarFallback>
                      {user.name.toUpperCase()[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Input
                    type="file"
                    className="hidden"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                  />
                  <Button variant="outline" onClick={handleProfileClick}>
                    Change Avatar
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    defaultValue={user.name}
                    onChange={handleDataChange("name")}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    placeholder="Enter your username"
                    defaultValue="johndoe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Enter your bio"
                    className="min-h-[100px]"
                    defaultValue="Software engineer, open-source enthusiast, and tech blogger."
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" onClick={handleSave}>
                  <span className="ml-2 w-4 h-4"></span>
                  <span>Save Changes</span>
                  <span className="ml-2 w-4 h-4">
                    {isLoading && <Loader size="sm" />}
                  </span>
                </Button>
              </CardFooter>
            </Card>
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Email Addresses</CardTitle>
                  <CardDescription>
                    Manage your email addresses.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">johndoe@example.com</div>
                      <div className="text-muted-foreground text-sm">
                        Primary
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <PencilIcon className="h-5 w-5" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">john@acme.inc</div>
                      <div className="text-muted-foreground text-sm">Work</div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <PencilIcon className="h-5 w-5" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </div>
                  <Button variant="outline">Add Email</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>Change your password.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="oldPassword">Current Password</Label>
                    <Input
                      id="oldPassword"
                      type="password"
                      placeholder="Enter your current password"
                      onChange={handleDataChange("oldPassword")}
                    />
                    {errors.oldPassword && (
                      <p className="text-red-500">{errors.oldPassword}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Enter your new password"
                      onChange={handleDataChange("newPassword")}
                    />
                    {errors.newPassword && (
                      <p className="text-red-500">{errors.newPassword}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your new password"
                      onChange={handleDataChange("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500">{errors.confirmPassword}</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto" onClick={handleChangePassword}>
                    Change Password
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>
                    Manage your account security settings.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">
                        Two-Factor Authentication
                      </div>
                      <div className="text-muted-foreground text-sm">
                        Protect your account with an additional layer of
                        security.
                      </div>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Login Activity</div>
                      <div className="text-muted-foreground text-sm">
                        View and manage your recent login activity.
                      </div>
                    </div>
                    <Button variant="outline">View Activity</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Authorized Applications</div>
                      <div className="text-muted-foreground text-sm">
                        Manage the applications that have access to your
                        account.
                      </div>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PencilIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  );
}
