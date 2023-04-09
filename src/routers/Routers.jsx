import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import IdeaPage from "../Pages/IdeaPage/IdeaPage";
import SubmissionPage from "../Pages/SubmissionPage/SubmissionUser";
import ContactPage from "../Pages/ContactPage/ContactPage";
import LoginPage from "./../Pages/LoginPage/LoginPage";
import AddIdea from "../Pages/IdeaPage/AddIdea";
import ListIdea from "../Pages/IdeaPage/ListIdea";
import SubmissionAdmin from "../Pages/SubmissionPage/Admin/SubmissionAdmin";
import SubmissionQA from "../Pages/SubmissionPage/QA/SubmissionQA";
import { useAuth } from "../context/auth";
import HomePage from "../Pages/HomePage/HomePage";
import Per from "../components/Error/Per";
import ManageCategory from "../Pages/Admin/Category/ManageCategory";
import ManageAdmin from "../Pages/Admin/ManageAdmin";
import ManageQA from "../Pages/QA/ManageQA";
import ManageSub from "../Pages/Admin/Sub/ManageSub";
import CreateCategory from "../Pages/Admin/Category/CreateCategory";
import UpdateCategory from "../Pages/Admin/Category/UpdateCategory";
import ManageRole from "../Pages/Admin/Role/ManageRole";
import CreateRole from "../Pages/Admin/Role/CreateRole";
import UpdateRole from "../Pages/Admin/Role/UpdateRole";
import ManageUser from "../Pages/Admin/User/ManageUser";
import CreateUser from "../Pages/Admin/User/CreateUser";
import UpdateUser from "../Pages/Admin/User/UpdateUser";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard";
import UpdateSub from "../Pages/Admin/Sub/UpdateSub";
import CreateSub from "../Pages/Admin/Sub/CreateSub";
import ManageIdea from "../Pages/Admin/Idea/ManageIdea";
import ManageIdeaQA from "../Pages/QA/Idea/ManageIdeaQA";
import ManageSubQA from "../Pages/QA/Sub/ManageSubQA";
import CreateSubQA from "../Pages/QA/Sub/CreateSubQA";
import UpdateSubQA from "../Pages/QA/Sub/UpdateSubQA";
import DetailIdea from "../Pages/IdeaPage/DetailIdea";

const Routers = () => {
  const [auth] = useAuth();
  const check = !auth.users?.role.name;
  const checkAdmin = auth.users?.role?.name === "admin";
  const checkQa = auth.users?.role?.name === "QA";
  const checkUser = auth.users?.role?.name === "user";
  return (
    <Routes>
      <Route
        path="submission"
        element={checkAdmin || checkQa || checkUser ? <SubmissionPage /> : ""}
      />

      {/* User */}
      <Route path="/" element={<Navigate to={"/home"} />} />
      <Route path="home" element={check ? <LoginPage /> : <HomePage />} />
      <Route path="idea" element={check ? <LoginPage /> : <IdeaPage />} />
      <Route path="idea/:id" element={check ? <LoginPage /> : <DetailIdea />} />
      <Route
        path="submission"
        element={check ? <LoginPage /> : <SubmissionPage />}
      />
      <Route
        path="/listIdea/:id"
        element={check ? <LoginPage /> : <ListIdea />}
      />
      <Route path="contact" element={<ContactPage />} />
      <Route path="login" element={check ? <LoginPage /> : <HomePage />} />
      <Route
        path="addIdea/:id"
        element={checkUser || checkAdmin || checkQa ? <AddIdea /> : <Per />}
      />

      {/* QA */}
      <Route
        path="submissionQA"
        element={checkQa || checkAdmin ? <SubmissionQA /> : <Per />}
      />
      <Route path="manageQA" element={<ManageQA />} />
      <Route path="manage-idea-QA" element={<ManageIdeaQA />} />

      <Route path="manage-sub-QA" element={<ManageSubQA />} />
      <Route path="create-sub-QA" element={<CreateSubQA />} />
      <Route path="update-sub-QA/:id" element={<UpdateSubQA />} />

      {/* Admin */}
      <Route
        path="manageAdmin"
        element={checkAdmin ? <ManageAdmin /> : <Per />}
      />
      <Route
        path="submissionAdmin"
        element={checkAdmin ? <SubmissionAdmin /> : <Per />}
      />

      <Route path="dashboard" element={checkAdmin ? <Dashboard /> : <Per />} />
      <Route
        path="manage-user-admin"
        element={checkAdmin ? <ManageUser /> : <Per />}
      />
      <Route
        path="create-user-admin"
        element={checkAdmin ? <CreateUser /> : <Per />}
      />
      <Route
        path="update-user/admin/:id"
        element={checkAdmin ? <UpdateUser /> : <Per />}
      />
      <Route
        path="manage-category-admin"
        element={checkAdmin ? <ManageCategory /> : <Per />}
      />
      <Route
        path="create-category-admin"
        element={checkAdmin ? <CreateCategory /> : <Per />}
      />
      <Route
        path="update-category/admin/:id"
        element={checkAdmin ? <UpdateCategory /> : <Per />}
      />
      <Route
        path="manage-idea-admin"
        element={checkAdmin ? <ManageIdea /> : <Per />}
      />

      <Route
        path="manage-sub-admin"
        element={checkAdmin ? <ManageSub /> : <Per />}
      />
      <Route
        path="create-sub-admin"
        element={checkAdmin ? <CreateSub /> : <Per />}
      />
      <Route
        path="update-sub/admin/:id"
        element={checkAdmin ? <UpdateSub /> : <Per />}
      />
      <Route
        path="manage-role-admin"
        element={checkAdmin ? <ManageRole /> : <Per />}
      />
      <Route
        path="create-role-admin"
        element={checkAdmin ? <CreateRole /> : <Per />}
      />
      <Route
        path="update-role/admin/:id"
        element={checkAdmin ? <UpdateRole /> : <Per />}
      />
    </Routes>
  );
};

export default Routers;
