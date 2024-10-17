IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

CREATE TABLE [AspNetRoles] (
    [Id] integer NOT NULL,
    [Name] character varying(256) NULL,
    [NormalizedName] character varying(256) NULL,
    [ConcurrencyStamp] text NULL,
    CONSTRAINT [PK_AspNetRoles] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [AspNetUsers] (
    [Id] integer NOT NULL,
    [UserName] character varying(256) NULL,
    [NormalizedUserName] character varying(256) NULL,
    [Email] character varying(256) NULL,
    [NormalizedEmail] character varying(256) NULL,
    [EmailConfirmed] boolean NOT NULL,
    [PasswordHash] text NULL,
    [SecurityStamp] text NULL,
    [ConcurrencyStamp] text NULL,
    [PhoneNumber] text NULL,
    [PhoneNumberConfirmed] boolean NOT NULL,
    [TwoFactorEnabled] boolean NOT NULL,
    [LockoutEnd] timestamp with time zone NULL,
    [LockoutEnabled] boolean NOT NULL,
    [AccessFailedCount] integer NOT NULL,
    [Gender] text NULL,
    [SeekGender] text NULL,
    [SexualOrientation] text NULL,
    [AgeFrom] integer NULL,
    [AgeTo] integer NULL,
    [Headline] text NULL,
    [Description] text NULL,
    [Country] text NULL,
    [State] text NULL,
    [City] text NULL,
    [Zip] text NULL,
    [MartialStatus] text NULL,
    [LookingFor] text NULL,
    [Occupation] text NULL,
    [Language] text NULL,
    [Race] text NULL,
    [Religion] text NULL,
    [Height] text NULL,
    [BodyType] text NULL,
    [EyeColor] text NULL,
    [HairColor] text NULL,
    [WantChildren] text NULL,
    [HaveChildren] text NULL,
    [Education] text NULL,
    [Smoke] text NULL,
    [Drink] text NULL,
    [Interests] text NULL,
    [DateOfBirth] timestamp without time zone NOT NULL,
    [Created] timestamp without time zone NULL,
    [LastActive] timestamp without time zone NULL,
    CONSTRAINT [PK_AspNetUsers] PRIMARY KEY ([Id])
);

GO

CREATE TABLE [AspNetRoleClaims] (
    [Id] integer NOT NULL,
    [RoleId] integer NOT NULL,
    [ClaimType] text NULL,
    [ClaimValue] text NULL,
    CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE
);

GO

CREATE TABLE [AspNetUserClaims] (
    [Id] integer NOT NULL,
    [UserId] integer NOT NULL,
    [ClaimType] text NULL,
    [ClaimValue] text NULL,
    CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);

GO

CREATE TABLE [AspNetUserLogins] (
    [LoginProvider] text NOT NULL,
    [ProviderKey] text NOT NULL,
    [ProviderDisplayName] text NULL,
    [UserId] integer NOT NULL,
    CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY ([LoginProvider], [ProviderKey]),
    CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);

GO

CREATE TABLE [AspNetUserRoles] (
    [UserId] integer NOT NULL,
    [RoleId] integer NOT NULL,
    CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY ([UserId], [RoleId]),
    CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY ([RoleId]) REFERENCES [AspNetRoles] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);

GO

CREATE TABLE [AspNetUserTokens] (
    [UserId] integer NOT NULL,
    [LoginProvider] text NOT NULL,
    [Name] text NOT NULL,
    [Value] text NULL,
    CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY ([UserId], [LoginProvider], [Name]),
    CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);

GO

CREATE TABLE [Favorites] (
    [FavoriteId] integer NOT NULL,
    [UserId] integer NOT NULL,
    [FavoriteActive] boolean NOT NULL,
    [ActiveId] integer NULL,
    CONSTRAINT [PK_Favorites] PRIMARY KEY ([FavoriteId], [UserId]),
    CONSTRAINT [FK_Favorites_AspNetUsers_ActiveId] FOREIGN KEY ([ActiveId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Favorites_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION
);

GO

CREATE TABLE [Likes] (
    [LikerId] integer NOT NULL,
    [LikeeId] integer NOT NULL,
    CONSTRAINT [PK_Likes] PRIMARY KEY ([LikerId], [LikeeId]),
    CONSTRAINT [FK_Likes_AspNetUsers_LikeeId] FOREIGN KEY ([LikeeId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Likes_AspNetUsers_LikerId] FOREIGN KEY ([LikerId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION
);

GO

CREATE TABLE [Photos] (
    [Id] integer NOT NULL,
    [Url] text NULL,
    [Description] text NULL,
    [DateAdded] timestamp without time zone NULL,
    [IsMain] boolean NOT NULL,
    [PublicId] text NULL,
    [UserId] integer NULL,
    CONSTRAINT [PK_Photos] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Photos_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION
);

GO

CREATE TABLE [Visitors] (
    [VisitorId] integer NOT NULL,
    [UserId] integer NOT NULL,
    [VisitorCount] integer NOT NULL,
    CONSTRAINT [PK_Visitors] PRIMARY KEY ([VisitorId], [UserId]),
    CONSTRAINT [FK_Visitors_AspNetUsers_UserId] FOREIGN KEY ([UserId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE NO ACTION,
    CONSTRAINT [FK_Visitors_AspNetUsers_VisitorId] FOREIGN KEY ([VisitorId]) REFERENCES [AspNetUsers] ([Id]) ON DELETE CASCADE
);

GO

CREATE INDEX [IX_AspNetRoleClaims_RoleId] ON [AspNetRoleClaims] ([RoleId]);

GO

CREATE UNIQUE INDEX [RoleNameIndex] ON [AspNetRoles] ([NormalizedName]);

GO

CREATE INDEX [IX_AspNetUserClaims_UserId] ON [AspNetUserClaims] ([UserId]);

GO

CREATE INDEX [IX_AspNetUserLogins_UserId] ON [AspNetUserLogins] ([UserId]);

GO

CREATE INDEX [IX_AspNetUserRoles_RoleId] ON [AspNetUserRoles] ([RoleId]);

GO

CREATE INDEX [EmailIndex] ON [AspNetUsers] ([NormalizedEmail]);

GO

CREATE UNIQUE INDEX [UserNameIndex] ON [AspNetUsers] ([NormalizedUserName]);

GO

CREATE INDEX [IX_Favorites_ActiveId] ON [Favorites] ([ActiveId]);

GO

CREATE INDEX [IX_Favorites_UserId] ON [Favorites] ([UserId]);

GO

CREATE INDEX [IX_Likes_LikeeId] ON [Likes] ([LikeeId]);

GO

CREATE INDEX [IX_Photos_UserId] ON [Photos] ([UserId]);

GO

CREATE INDEX [IX_Visitors_UserId] ON [Visitors] ([UserId]);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220412093620_FinalInitials', N'3.1.18');

GO

ALTER TABLE [Likes] ADD [IsActive] boolean NOT NULL DEFAULT CAST(0 AS boolean);

GO

INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
VALUES (N'20220526112307_LikeIsActive', N'3.1.18');

GO

